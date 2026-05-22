import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const infoCards = [
    {
      id: 'disponibilidad',
      title: 'Disponibilidad',
      description: 'Visualiza tu disponibilidad a través del tiempo y con diferentes métricas.',
      icon: '⏱',
    },
    {
      id: 'disponibilidad-objetivos',
      title: 'Disponibilidad con Objetivos',
      description: 'Visualiza tu disponibilidad a través del tiempo con tus objetivos de disponibilidad.',
      icon: '🎯',
    },
    {
      id: 'anotacion',
      title: 'Anotación paradas',
      description: 'Visualice el % de anotaciones de su máquina a través de períodos de tiempo.',
      icon: '📊',
    },
    {
      id: 'paradas',
      title: 'Paradas',
      description: 'Visualice sus causas generales y específicas en gráficas de Paretos.',
      icon: '📈',
    },
  ];

  const accordionItems = [
    { id: 'disponibilidad', label: '⏱ Disponibilidad', content: 'Gráficos de disponibilidad' },
    { id: 'oee', label: '📊 OEE', content: 'Gráficos de OEE' },
    { id: 'produccion', label: '📦 Producción', content: 'Gráficos de producción' },
    { id: 'anotacion-paros', label: '✗ Anotación paros', content: 'Gráficos de anotación' },
    { id: 'paradas', label: '🛡 Paradas', content: 'Gráficos de paradas' },
    { id: 'velocidad', label: '〜 Velocidad de Producción', content: 'Gráficos de velocidad' },
    { id: 'mttr', label: '〜 MTTR', content: 'Gráficos de MTTR' },
    { id: 'avanzados', label: '〜 Gráficos avanzados', content: 'Gráficos avanzados' },
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);

  const visibleCards = infoCards.slice(carouselIndex, carouselIndex + 2);

  return (
    <div className="w-full p-6">
      {/* Carousel Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Paneles Informativos</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
            disabled={carouselIndex === 0}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-2 gap-4 flex-1">
            {visibleCards.map((card) => (
              <div key={card.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCarouselIndex(Math.min(infoCards.length - 2, carouselIndex + 1))}
            disabled={carouselIndex >= infoCards.length - 2}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(Math.ceil(infoCards.length / 2))].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCarouselIndex(idx * 2)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === Math.floor(carouselIndex / 2) ? 'bg-brand-green' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Accordion Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Otros Gráficos</h2>
        <div className="grid grid-cols-2 gap-4">
          {accordionItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg">
              <button
                onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">{item.label}</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    activeAccordion === item.id ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {activeAccordion === item.id && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-gray-700">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
