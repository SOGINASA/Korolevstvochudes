import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Camera, 
  Package, 
  Search,
  Plus,
  Trash2,
  Upload,
  Scan,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

import Quagga from "quagga"; // импортируем библиотеку

const AddItemModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onSearchItems,
  onGetBarcodeInfo,
  loadCategories,
  categories,
  constants 
}) => {
  const [step, setStep] = useState(1); // 1: Сканирование/поиск, 2: Заполнение формы, 3: Подтверждение
  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    sku: '',
    description: '',
    category_id: '',
    unit: 'шт',
    min_quantity: 0,
    max_quantity: 1000,
    cost_price: 0,
    current_quantity: 0
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [barcodeInfo, setBarcodeInfo] = useState(null);
  const [existingItem, setExistingItem] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Очистка формы при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Загрузка категорий для автодополнения
  useEffect(() => {
    if (categoryInput.length > 0) {
      const filtered = categories.filter(cat => 
        cat.name.toLowerCase().includes(categoryInput.toLowerCase())
      );
      setCategorySuggestions(filtered.slice(0, 5));
    } else {
      setCategorySuggestions([]);
    }
  }, [categoryInput, categories]);

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      barcode: '',
      sku: '',
      description: '',
      category_id: '',
      unit: 'шт',
      min_quantity: 0,
      max_quantity: 1000,
      cost_price: 0,
      current_quantity: 0
    });
    setSelectedCategories([]);
    setCategoryInput('');
    setErrors({});
    setBarcodeInfo(null);
    setExistingItem(null);
    stopCamera();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Не удалось получить доступ к камере');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      // Здесь должна быть логика распознавания штрих-кода
      // Пока используем заглушку
      const mockBarcode = Math.random().toString().substring(2, 15);
      handleBarcodeDetected(mockBarcode);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageSrc = reader.result;

        Quagga.decodeSingle(
          {
            src: imageSrc, // путь к фото (base64)
            numOfWorkers: 0, // для браузера в decodeSingle ставим 0
            inputStream: {
              size: 800, // масштаб изображения для улучшения распознавания
            },
            decoder: {
              readers: ["ean_reader"], 
              // можно указать нужные форматы штрих-кодов
            },
          },
          (result) => {
            if (result && result.codeResult) {
              console.log()
              handleBarcodeDetected(result.codeResult.code);
            } else {
              console.warn("Штрих-код не распознан");
            }
          }
        );
      };

      reader.readAsDataURL(file); // читаем файл как base64
    }
  };

  const handleBarcodeDetected = async (barcode) => {
    setLoading(true);
    try {
      // Проверяем существование товара в базе
      const searchResults = await onSearchItems(barcode);
      if (searchResults.length > 0) {
        console.log('Проблема здесь');
        setExistingItem(searchResults[0]);
        setFormData(prev => ({ ...prev, ...searchResults[0] }));
        setStep(2);
        return;
      }
      
      // Получаем информацию о товаре по штрих-коду
      const barcodeResult = await onGetBarcodeInfo(barcode);
      console.log(barcodeResult);
      if (barcodeResult.success) {
        setBarcodeInfo(barcodeResult);
        console.log('Проблема здесь 1');
        if (barcodeResult.external_data) {
          setFormData(prev => ({
            ...prev,
            barcode: barcode,
            name: barcodeResult.external_data.name || '',
            description: barcodeResult.external_data.description || '',
            cost_price: barcodeResult.external_data.estimated_price || 0
          }));
          
          // Автозаполнение категорий
          if (barcodeResult.external_data.category) {
            setSelectedCategories(barcodeResult.external_data.category.split('/').map(item => item.trim()));
          }
        } else {
          setFormData(prev => ({ ...prev, barcode: barcode }));
        }
        
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      console.log('Проблема здесь 2');
      console.error('Error processing barcode:', error);
      // Все равно переходим к форме с пустым штрих-кодом
      setFormData(prev => ({ ...prev, barcode: barcode }));
      setStep(2);
    } finally {
      setLoading(false);
      stopCamera();
    }
  };

  const handleManualBarcodeInput = (barcode) => {
    if (barcode.trim()) {
      handleBarcodeDetected(barcode.trim());
    }
  };

  const handleCategoryAdd = (categoryName) => {
    if (categoryName && !selectedCategories.includes(categoryName)) {
      setSelectedCategories(prev => [...prev, categoryName]);
      setCategoryInput('');
      setCategorySuggestions([]);
    }
  };

  const handleCategoryRemove = (categoryName) => {
    setSelectedCategories(prev => prev.filter(cat => cat !== categoryName));
  };

  const handleCategorySuggestionClick = (category) => {
    handleCategoryAdd(category.name);
    setFormData(prev => ({ ...prev, category_id: category.id }));
  };

  const handleCategoryInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCategoryAdd(categoryInput);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Название товара обязательно';
    }
    
    if (!formData.category_id && selectedCategories.length === 0) {
      newErrors.category = 'Выберите категорию';
    }
    
    if (formData.min_quantity < 0) {
      newErrors.min_quantity = 'Минимальное количество не может быть отрицательным';
    }
    
    if (formData.max_quantity <= formData.min_quantity) {
      newErrors.max_quantity = 'Максимальное количество должно быть больше минимального';
    }
    
    if (formData.current_quantity < 0) {
      newErrors.current_quantity = 'Количество не может быть отрицательным';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        // Если не выбрана конкретная категория, создаем новую из первой выбранной
        category_name: selectedCategories[0] || null
      };

      const result = await onSubmit(submissionData);
      if (result.success) {
        onClose();
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Package className="mx-auto h-12 w-12 text-purple-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Добавление товара
        </h3>
        <p className="text-sm text-gray-500">
          Отсканируйте штрих-код или введите данные вручную
        </p>
      </div>

      {/* Ручной ввод штрих-кода */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Штрих-код товара
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Введите штрих-код"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleManualBarcodeInput(e.target.value);
              }
            }}
          />
          <button
            onClick={(e) => {
              const input = e.target.parentElement.querySelector('input');
              handleManualBarcodeInput(input.value);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">или</span>
        </div>
      </div>

      {/* Сканирование камерой */}
      <div className="space-y-4">
        {!cameraActive ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <button
                onClick={startCamera}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Scan className="h-4 w-4" />
                <span>Сканировать камерой</span>
              </button>
              
              <div className="text-sm text-gray-500">или</div>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Upload className="h-4 w-4" />
                <span>Загрузить фото</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
              <button
                onClick={captureImage}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                Сканировать
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <canvas ref={canvasRef} className="hidden" />

      {/* Кнопка пропуска */}
      <div className="text-center">
        <button
          onClick={() => setStep(2)}
          className="text-purple-600 hover:text-purple-800 text-sm underline"
        >
          Пропустить и заполнить вручную
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Информация о товаре
        </h3>
        {existingItem && (
          <div className="flex items-center space-x-2 text-orange-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Товар уже существует</span>
          </div>
        )}
        {barcodeInfo && (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Данные получены автоматически</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Название */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название товара *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Введите название товара"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Штрих-код */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Штрих-код
          </label>
          <input
            type="text"
            value={formData.barcode}
            onChange={(e) => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Штрих-код"
          />
        </div>

        {/* Начальное количество */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Начальное количество
          </label>
          <input
            type="number"
            value={formData.current_quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, current_quantity: parseInt(e.target.value) || 0 }))}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.current_quantity ? 'border-red-500' : 'border-gray-300'
            }`}
            min="0"
          />
          {errors.current_quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.current_quantity}</p>
          )}
        </div>

        {/* Описание */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Описание
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="3"
            placeholder="Описание товара"
          />
        </div>

        {/* Категории */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Категории *
          </label>
          
          {/* Выбранные категории */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedCategories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-sm"
                >
                  <span>{category}</span>
                  <button
                    onClick={() => handleCategoryRemove(category)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Ввод категории */}
          <div className="relative">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyPress={handleCategoryInputKeyPress}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите категорию и нажмите Enter"
            />
            
            {/* Подсказки категорий */}
            {categorySuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                {categorySuggestions.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySuggestionClick(category)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* Единица измерения */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Единица измерения
          </label>
          <select
            value={formData.unit}
            onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="шт">шт</option>
            <option value="кг">кг</option>
            <option value="л">л</option>
            <option value="м">м</option>
            <option value="упак">упак</option>
            <option value="комплект">комплект</option>
          </select>
        </div>

        {/* Себестоимость */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Себестоимость (₸)
          </label>
          <input
            type="number"
            value={formData.cost_price}
            onChange={(e) => setFormData(prev => ({ ...prev, cost_price: parseFloat(e.target.value) || 0 }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            min="0"
            step="0.01"
          />
        </div>

        {/* Минимальное количество */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Минимальный остаток
          </label>
          <input
            type="number"
            value={formData.min_quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, min_quantity: parseInt(e.target.value) || 0 }))}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.min_quantity ? 'border-red-500' : 'border-gray-300'
            }`}
            min="0"
          />
          {errors.min_quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.min_quantity}</p>
          )}
        </div>

        {/* Максимальное количество */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Максимальный остаток
          </label>
          <input
            type="number"
            value={formData.max_quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, max_quantity: parseInt(e.target.value) || 0 }))}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.max_quantity ? 'border-red-500' : 'border-gray-300'
            }`}
            min="1"
          />
          {errors.max_quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.max_quantity}</p>
          )}
        </div>

        
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Подтверждение добавления
        </h3>
        <p className="text-sm text-gray-500">
          Проверьте данные товара перед добавлением
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Название:</span>
            <div className="text-gray-900">{formData.name}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Категории:</span>
            <div className="text-gray-900">{selectedCategories.join(', ') || 'Не указаны'}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Штрих-код:</span>
            <div className="text-gray-900">{formData.barcode || 'Не указан'}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Артикул:</span>
            <div className="text-gray-900">{formData.sku || 'Не указан'}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Единица:</span>
            <div className="text-gray-900">{formData.unit}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Себестоимость:</span>
            <div className="text-gray-900">{formData.cost_price} ₸</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Мин. остаток:</span>
            <div className="text-gray-900">{formData.min_quantity}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Макс. остаток:</span>
            <div className="text-gray-900">{formData.max_quantity}</div>
          </div>
          <div className="col-span-2">
            <span className="font-medium text-gray-700">Начальное количество:</span>
            <div className="text-gray-900">{formData.current_quantity} {formData.unit}</div>
          </div>
        </div>
        
        {formData.description && (
          <div>
            <span className="font-medium text-gray-700">Описание:</span>
            <div className="text-gray-900 mt-1">{formData.description}</div>
          </div>
        )}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Добавить товар
          </h2>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Индикатор шагов */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
              <div className="flex items-center">
              <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              >
              {stepNumber}
              </div>
              </div>

              {stepNumber < 3 && (
              <div
              className={`w-12 h-1 mx-2 ${
                step > stepNumber ? 'bg-purple-600' : 'bg-gray-200'
              }`}
              />
              )}
              </React.Fragment>
              ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Сканирование</span>
            <span>Заполнение</span>
            <span>Подтверждение</span>
          </div>
        </div>

        {/* Контент */}
        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader className="h-8 w-8 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">Обработка...</span>
            </div>
          )}
          
          {!loading && step === 1 && renderStep1()}
          {!loading && step === 2 && renderStep2()}
          {!loading && step === 3 && renderStep3()}
        </div>

        {/* Кнопки */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                disabled={loading}
                className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Назад
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => {
                onClose();
                resetForm();
              }}
              disabled={loading}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Отмена
            </button>
            
            {step < 3 ? (
              <button
                onClick={() => {
                  if (step === 2 && validateForm()) {
                    setStep(3);
                  }
                }}
                disabled={loading || (step === 2 && !formData.name.trim())}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Далее
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {loading && <Loader className="h-4 w-4 animate-spin" />}
                <span>Добавить товар</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;