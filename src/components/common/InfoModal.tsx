import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="border-b px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fechar modal"
          >
            {/* SVG do botão Fechar */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14.828" height="14.828" viewBox="0 0 14.828 14.828">
              <path d="M6,18,18,6M6,6,18,18" transform="translate(-4.586 -4.586)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          <p className="text-sm whitespace-pre-wrap">{description}</p> {/* whitespace-pre-wrap para manter quebras de linha se houver */}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-6 bg-primary-blue text-white rounded hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
