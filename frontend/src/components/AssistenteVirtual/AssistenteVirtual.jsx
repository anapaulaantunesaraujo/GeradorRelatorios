import React, { useState, useEffect, useRef } from 'react';
import { GUIDED_TOURS, TOUR_CATEGORIES } from './guidedTours';
import {
  generateAssistantResponse,
  QUICK_SUGGESTIONS,
  saveAnswerFeedback
} from './aiEngine';
import GuidedTourOverlay from './GuidedTourOverlay';
import './AssistenteVirtual.css';

const ONBOARDING_STORAGE_KEY = 'zebra_onboarding_completed';

// Renderiza **negrito** e *itálico* de forma simples e segura
function formatMessageText(text) {
  return text.split('\n').map((line, lineIdx) => {
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return (
      <React.Fragment key={lineIdx}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
        {lineIdx < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    );
  });
}

function SparkleIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 3v3M17.5 4.5h3" />
      <circle cx="5.5" cy="18.5" r="1.2" />
    </svg>
  );
}

function CompassIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

export default function AssistenteVirtual() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'guides'
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTour, setActiveTour] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Olá! 👋 Sou a **Assistente Zebra Print**. Estou aqui para tirar qualquer dúvida sobre o sistema em linguagem simples ou te guiar passo a passo na tela!',
      tourId: 'visao-geral',
      tourTitle: 'Visão Geral - Zebra Print System'
    }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-apresentação no primeiro acesso (primeiro login)
  useEffect(() => {
    const alreadyDone = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!alreadyDone) {
      const timer = setTimeout(() => {
        const overviewTour = GUIDED_TOURS.find(t => t.id === 'visao-geral');
        if (overviewTour) {
          setActiveTour(overviewTour);
        }
      }, 650);
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, activeTab]);

  const startTourById = (tourId) => {
    const found = GUIDED_TOURS.find(t => t.id === tourId);
    if (found) {
      setIsOpen(false);
      setActiveTour(found);
    }
  };

  const handleTourClose = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    setActiveTour(null);
  };

  const handleTourComplete = (completedTour) => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    setActiveTour(null);
    setMessages(prev => [
      ...prev,
      {
        id: `done-${Date.now()}`,
        sender: 'bot',
        text: `Parabéns! 🎉 Você concluiu o guia **${completedTour.title}**. Se precisar refazer este ou qualquer outro guia, é só me chamar!`
      }
    ]);
  };

  const sendQuestion = (questionText) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Pequeno delay natural para simular leitura/raciocínio humanizado
    setTimeout(() => {
      const reply = generateAssistantResponse(trimmed);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply.text,
          tourId: reply.tourId,
          tourTitle: reply.tourTitle,
          articleId: reply.articleId,
          questionRef: trimmed,
          feedback: null
        }
      ]);
      setIsTyping(false);
    }, 360);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendQuestion(inputValue);
  };

  const handleFeedback = (msgId, helpful) => {
    setMessages(prev =>
      prev.map(m => {
        if (m.id === msgId) {
          saveAnswerFeedback(m.questionRef || '', m.articleId || '', helpful);
          return { ...m, feedback: helpful ? 'up' : 'down' };
        }
        return m;
      })
    );
  };

  const filteredTours =
    selectedCategory === 'Todos'
      ? GUIDED_TOURS
      : GUIDED_TOURS.filter(t => t.category === selectedCategory);

  return (
    <>
      {/* Overlay de Instrução Guiada na Tela */}
      {activeTour && (
        <GuidedTourOverlay
          tour={activeTour}
          onClose={handleTourClose}
          onComplete={handleTourComplete}
        />
      )}

      {/* Janela Flutuante da Assistente Virtual */}
      {isOpen && (
        <div className="assistant-modal" role="dialog" aria-label="Assistente Zebra Print">
          {/* Cabeçalho Azul */}
          <div className="assistant-header">
            <div className="assistant-header-info">
              <div className="assistant-avatar">
                <SparkleIcon size={20} />
              </div>
              <div>
                <h2 className="assistant-title">Assistente Zebra Print</h2>
                <p className="assistant-subtitle">Online • Guia Interativo &amp; Dúvidas</p>
              </div>
            </div>
            <button
              type="button"
              className="assistant-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar assistente"
            >
              ✕
            </button>
          </div>

          {/* Abas: Chat de Dúvidas | Instruções Guiadas */}
          <div className="assistant-tabs">
            <button
              type="button"
              className={`assistant-tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <SparkleIcon size={15} />
              <span>Chat de Dúvidas</span>
            </button>
            <button
              type="button"
              className={`assistant-tab ${activeTab === 'guides' ? 'active guides-active' : ''}`}
              onClick={() => setActiveTab('guides')}
            >
              <CompassIcon size={15} />
              <span>Instruções Guiadas</span>
              <span className="assistant-tab-badge">{GUIDED_TOURS.length}</span>
            </button>
          </div>

          {/* CONTEÚDO: ABA CHAT DE DÚVIDAS */}
          {activeTab === 'chat' && (
            <div className="assistant-chat-view">
              <div className="assistant-messages">
                {messages.map(msg => (
                  <div key={msg.id} className={`assistant-msg-row ${msg.sender}`}>
                    <div className={`assistant-bubble ${msg.sender}`}>
                      <div className="assistant-bubble-text">
                        {formatMessageText(msg.text)}
                      </div>

                      {msg.tourId && (
                        <button
                          type="button"
                          className="assistant-inline-tour-btn"
                          onClick={() => startTourById(msg.tourId)}
                        >
                          <span className="inline-tour-icon">
                            <CompassIcon size={18} />
                          </span>
                          <span className="inline-tour-content">
                            <span className="inline-tour-kicker">🎯 Iniciar Instrução Guiada na Tela</span>
                            <span className="inline-tour-name">{msg.tourTitle}</span>
                          </span>
                        </button>
                      )}

                      {msg.sender === 'bot' && msg.id !== 'welcome' && msg.articleId && (
                        <div className="assistant-feedback-row">
                          <span>Essa resposta ajudou?</span>
                          <button
                            type="button"
                            className={`feedback-btn ${msg.feedback === 'up' ? 'selected' : ''}`}
                            onClick={() => handleFeedback(msg.id, true)}
                            title="Sim, ajudou!"
                          >
                            👍
                          </button>
                          <button
                            type="button"
                            className={`feedback-btn ${msg.feedback === 'down' ? 'selected' : ''}`}
                            onClick={() => handleFeedback(msg.id, false)}
                            title="Pode melhorar"
                          >
                            👎
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="assistant-msg-row bot">
                    <div className="assistant-bubble bot typing-bubble">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                  </div>
                )}

                {/* Sugestões rápidas de perguntas */}
                {messages.length <= 2 && (
                  <div className="assistant-suggestions">
                    {QUICK_SUGGESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="assistant-suggestion-pill"
                        onClick={() => sendQuestion(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <form className="assistant-input-bar" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Pergunte sobre qualquer processo ou ferramenta..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="assistant-send-btn"
                  disabled={!inputValue.trim()}
                  aria-label="Enviar pergunta"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {/* CONTEÚDO: ABA INSTRUÇÕES GUIADAS */}
          {activeTab === 'guides' && (
            <div className="assistant-guides-view">
              <div className="guides-info-banner">
                <div className="guides-info-title">
                  <CompassIcon size={16} />
                  <span>Instruções Guiadas na Prática:</span>
                </div>
                <p>
                  Ao escolher um guia abaixo, a assistente colocará{' '}
                  <strong>círculos luminosos ao redor de onde você deve clicar</strong> e
                  explicará passo a passo de forma simples e leiga.
                </p>
              </div>

              <div className="guides-category-filters">
                {TOUR_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className={`guides-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="guides-cards-list">
                {filteredTours.map(tour => (
                  <div key={tour.id} className="guide-card">
                    <div className="guide-card-top">
                      <div className="guide-card-title-wrap">
                        <span className="guide-cat-tag">{tour.category.toUpperCase()}</span>
                        <h3 className="guide-card-title">{tour.title}</h3>
                      </div>
                      <span className="guide-steps-count">{tour.steps.length} passos</span>
                    </div>
                    <p className="guide-card-desc">{tour.description}</p>
                    <button
                      type="button"
                      className="guide-start-btn"
                      onClick={() => startTourById(tour.id)}
                    >
                      <CompassIcon size={16} />
                      <span>Iniciar Guia na Tela</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão Flutuante (FAB) no canto inferior direito */}
      <button
        type="button"
        className={`assistant-fab ${isOpen ? 'open' : ''}`}
        data-tour="assistant-fab"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Fechar Assistente Virtual' : 'Abrir Assistente Virtual'}
        title="Assistente Virtual & Instruções Guiadas"
      >
        {isOpen ? <span className="fab-close-x">✕</span> : <SparkleIcon size={28} />}
      </button>
    </>
  );
}
