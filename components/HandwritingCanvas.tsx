
import React, { useRef, useEffect, useState } from 'react';
import { Eraser, Eye, EyeOff } from 'lucide-react';
import { ArabicLetter, VocabularyWord } from '../types';

interface HandwritingCanvasProps {
  letter?: ArabicLetter;
  word?: VocabularyWord;
}

const HandwritingCanvas: React.FC<HandwritingCanvasProps> = ({ letter, word }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);
  const [selectedForm, setSelectedForm] = useState<'isolated' | 'initial' | 'medial' | 'final'>('isolated');

  // Reset form when switching between letters/words
  useEffect(() => {
    if (word) {
      setSelectedForm('isolated'); // Words don't have forms in this context, just the full string
    }
    clearCanvas();
    setShowTemplate(true);
  }, [letter, word]);

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400; // Fixed height to maintain line ratio
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent scrolling on touch
    if (e.type === 'touchstart') {
       document.body.style.overscrollBehavior = 'none';
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1e293b'; // slate-800 (ink color)
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault(); // Important for touch
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    document.body.style.overscrollBehavior = ''; // Restore scrolling
  };

  // Determine what text to show
  const templateText = letter ? letter.forms[selectedForm] : (word ? word.arabic : '');
  
  // Labels
  const formLabels = {
    isolated: 'Allein',
    initial: 'Anfang',
    medial: 'Mitte',
    final: 'Ende'
  };

  // --- CONFIGURATION FOR 6-LINE SYSTEM ---
  // Layout based on manuscript:
  // Lines 1 & 2 (Top group)
  // Line 3 (Middle)
  // Line 4 (Baseline - Thick - 3rd from bottom)
  // Lines 5 & 6 (Bottom group)
  
  const baselineY = 240; // Line 4 position
  const majorGap = 55;   // Gap between main writing areas
  const minorGap = 15;   // Small gap for the top/bottom pairs
  
  const lines = [
      { id: 1, y: baselineY - (majorGap * 2) - minorGap, type: 'thin' }, // Topmost
      { id: 2, y: baselineY - (majorGap * 2), type: 'thin' },            // Top pair bottom
      { id: 3, y: baselineY - majorGap, type: 'thin' },                  // Upper middle
      { id: 4, y: baselineY, type: 'thick' },                            // BASELINE (3rd from bottom)
      { id: 5, y: baselineY + majorGap, type: 'thin' },                  // Bottom pair top
      { id: 6, y: baselineY + majorGap + minorGap, type: 'thin' },       // Bottommost
  ];

  // Calculate Top Offset based on content type (Letter vs Word)
  // Letters use font-size 160px, Words use 120px.
  // The offset is calculated to place the visual baseline of the font onto Line 4.
  const textTopOffset = letter ? (baselineY - 120) : (baselineY - 90);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden select-none">
      {/* Toolbar */}
      <div className="bg-slate-50 p-3 border-b border-slate-200 flex flex-wrap gap-3 justify-between items-center">
        
        {/* Form Selector (Only for letters) */}
        <div className="flex bg-white rounded-lg border border-slate-200 p-1 overflow-x-auto max-w-[70%]">
          {letter ? (
            (Object.keys(letter.forms) as Array<keyof typeof letter.forms>).reverse().map((formKey) => (
              <button
                  key={formKey}
                  onClick={() => {
                      setSelectedForm(formKey);
                      clearCanvas();
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedForm === formKey 
                      ? 'bg-emerald-100 text-emerald-800 shadow-sm' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
              >
                {formLabels[formKey]}
              </button>
            ))
          ) : (
            <span className="px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-md">
              Ganzes Wort
            </span>
          )}
        </div>

        {/* Tools */}
        <div className="flex gap-2">
            <button 
                onClick={() => setShowTemplate(!showTemplate)}
                className={`p-2 rounded-full border transition-colors ${showTemplate ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-white text-slate-400 border-slate-200'}`}
                title="Vorlage an/aus"
            >
                {showTemplate ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
            <button 
                onClick={clearCanvas}
                className="p-2 rounded-full bg-white text-red-500 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                title="Alles löschen"
            >
                <Eraser className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full h-[400px] bg-[#fffcf5] cursor-crosshair overflow-hidden">
        
        {/* 6-Line System Background */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
            {lines.map((line) => (
                <React.Fragment key={line.id}>
                    <div 
                        className={`absolute w-full ${line.type === 'thick' ? 'h-[3px] bg-slate-900' : 'h-px bg-slate-400'}`} 
                        style={{ top: line.y }} 
                    />
                    {/* Line Numbers */}
                    <div className="absolute left-4 text-[9px] text-slate-300 font-mono" style={{ top: line.y - 10 }}>
                        {line.id}
                    </div>
                </React.Fragment>
            ))}
        </div>

        {/* Template Text */}
        <div 
            className="absolute inset-0 flex justify-center pointer-events-none transition-opacity duration-300"
            style={{ 
                top: textTopOffset, 
                opacity: showTemplate ? 0.3 : 0 
            }}
        >
            <span 
                className="font-arabic text-slate-300 select-none whitespace-nowrap"
                style={{ 
                    fontSize: letter ? '160px' : '120px', 
                    lineHeight: '1', 
                    fontFamily: 'Amiri, "Noto Sans Arabic", serif',
                }}
            >
                {templateText}
            </span>
        </div>

        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="bg-slate-50 p-2 text-center border-t border-slate-200 flex justify-between px-4">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
            {letter ? `Buchstabe: ${letter.name}` : `Wort: ${word?.german}`}
        </span>
        <span className="text-[10px] text-emerald-600 font-medium">
            Schreibe auf der dicken Linie (Linie 4)
        </span>
      </div>
    </div>
  );
};

export default HandwritingCanvas;
