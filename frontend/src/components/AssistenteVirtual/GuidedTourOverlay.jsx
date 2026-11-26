import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GuidedTourOverlay.css';

export default function GuidedTourOverlay({ tour, onClose, onComplete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  const currentStep = tour?.steps?.[stepIndex];
  const totalSteps = tour?.steps?.length || 0;

  const measureTarget = useCallback(() => {
    if (!currentStep) return;
    const el = document.querySelector(currentStep.target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    } else {
      setTargetRect(null);
    }
  }, [currentStep]);

  // Navega para a rota do passo se necessário e mede o elemento alvo
  useEffect(() => {
    if (!currentStep) return;

    if (currentStep.route && location.pathname !== currentStep.route) {
      navigate(currentStep.route);
    }

    const t1 = setTimeout(measureTarget, 180);
    const t2 = setTimeout(measureTarget, 450);

    window.addEventListener('resize', measureTarget);
    window.addEventListener('scroll', measureTarget, true);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measureTarget);
      window.removeEventListener('scroll', measureTarget, true);
    };
  }, [currentStep, location.pathname, navigate, measureTarget]);

  // Reseta o passo quando um novo tour é iniciado
  useEffect(() => {
    setStepIndex(0);
  }, [tour?.id]);

  if (!tour || !currentStep) return null;

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete?.(tour);
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setStepIndex(prev => prev - 1);
    }
  };

  // Calcula posição inteligente do card de instrução para não sair da tela
  const getTooltipStyle = () => {
    const cardWidth = 370;
    const cardHeight = 310;
    const margin = 16;

    if (!targetRect) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // Tenta colocar abaixo do alvo
    let top = targetRect.top + targetRect.height + 18;
    let left = targetRect.left;

    // Se não couber embaixo, tenta acima
    if (top + cardHeight > viewportH - margin) {
      top = targetRect.top - cardHeight - 18;
    }

    // Se ainda não couber (ex: elemento muito alto), coloca ao lado direito ou esquerdo
    if (top < margin) {
      top = Math.max(margin, Math.min(targetRect.top, viewportH - cardHeight - margin));
      if (targetRect.left + targetRect.width + cardWidth + margin < viewportW) {
        left = targetRect.left + targetRect.width + 18;
      } else if (targetRect.left - cardWidth - margin > 0) {
        left = targetRect.left - cardWidth - 18;
      } else {
        left = Math.max(margin, (viewportW - cardWidth) / 2);
      }
    }

    // Garante que fique dentro da largura da janela
    left = Math.max(margin, Math.min(left, viewportW - cardWidth - margin));
    top = Math.max(margin, Math.min(top, viewportH - cardHeight - margin));

    return { top: `${top}px`, left: `${left}px` };
  };

  const pad = 6;

  return (
    <div className="guided-tour-root" role="dialog" aria-modal="true" aria-label="Instrução Guiada">
      {/* Fundo escurecido quando não há alvo visível */}
      {!targetRect && <div className="guided-tour-backdrop-full" onClick={onClose} />}

      {/* Recorte luminoso (Spotlight) ao redor do elemento alvo */}
      {targetRect && (
        <>
          <div
            className="guided-tour-spotlight"
            style={{
              top: `${Math.max(4, targetRect.top - pad)}px`,
              left: `${Math.max(4, targetRect.left - pad)}px`,
              width: `${targetRect.width + pad * 2}px`,
              height: `${targetRect.height + pad * 2}px`
            }}
          >
            <div className="guided-tour-click-badge">
              ✨ {currentStep.badgeText || 'CLIQUE AQUI!'}
            </div>
          </div>
        </>
      )}

      {/* Card explicativo da Instrução Guiada */}
      <div className="guided-tour-card" style={getTooltipStyle()}>
        <div className="guided-tour-card-header">
          <div className="guided-tour-header-left">
            <div className="guided-tour-sparkle-circle">✨</div>
            <div>
              <div className="guided-tour-meta">
                <span className="guided-tour-label">INSTRUÇÃO GUIADA</span>
                <span className="guided-tour-step-pill">
                  {stepIndex + 1} de {totalSteps}
                </span>
              </div>
              <h3 className="guided-tour-title">{currentStep.title}</h3>
            </div>
          </div>
          <button
            type="button"
            className="guided-tour-close"
            onClick={onClose}
            title="Fechar guia"
            aria-label="Fechar guia"
          >
            ✕
          </button>
        </div>

        <div className="guided-tour-box action-box">
          <div className="guided-tour-box-label">✨ O QUE FAZER AGORA:</div>
          <p>{currentStep.actionText}</p>
        </div>

        <div className="guided-tour-box info-box">
          <div className="guided-tour-box-label">ⓘ COMO FUNCIONA E O QUE FAZ:</div>
          <p>{currentStep.infoText}</p>
        </div>

        <div className="guided-tour-footer">
          <button
            type="button"
            className="guided-tour-btn-link"
            onClick={handlePrev}
            disabled={isFirst}
          >
            ← Voltar
          </button>

          <button
            type="button"
            className="guided-tour-btn-skip"
            onClick={onClose}
          >
            Pular Guia
          </button>

          <button
            type="button"
            className="guided-tour-btn-next"
            onClick={handleNext}
          >
            {isLast ? 'Concluir ✓' : 'Próximo Passo →'}
          </button>
        </div>
      </div>
    </div>
  );
}
