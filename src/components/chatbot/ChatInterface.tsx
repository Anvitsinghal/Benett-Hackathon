
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, MicOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import LanguageSelector from "@/components/LanguageSelector";

// Add TypeScript interface for the Web Speech API
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

export interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  chatType: 'scheme' | 'complaint';
  onSendMessage: (message: string) => Promise<string>;
  initialMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  chatType, 
  onSendMessage,
  initialMessage 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add initial bot message
  useEffect(() => {
    if (initialMessage) {
      setMessages([{
        id: '0',
        type: 'bot',
        text: initialMessage,
        timestamp: new Date()
      }]);
    }
  }, [initialMessage]);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    try {
      const response = await onSendMessage(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error("Sorry, there was an error processing your message");
      console.error("Chat error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const toggleRecording = () => {
    if (!isRecording) {
      if (!('webkitSpeechRecognition' in window)) {
        toast.error("Voice input is not supported in your browser");
        return;
      }
      
      try {
        // Fix the SpeechRecognition reference
        const SpeechRecognition = (window as any).SpeechRecognition || 
                                 (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = selectedLanguage;
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => {
          setIsRecording(true);
          toast.info("Listening...");
        };
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsRecording(false);
        };
        
        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event);
          setIsRecording(false);
          toast.error("Error while recording. Please try again.");
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        recognition.start();
      } catch (error) {
        toast.error("Could not start voice recording");
        console.error("Voice recording error:", error);
      }
    } else {
      setIsRecording(false);
      // Here we would stop the recognition if we had a reference to it
      toast.info("Recording stopped");
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-220px)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {chatType === 'scheme' ? 'Scheme Assistance' : 'Complaint Registration'}
        </h2>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
      
      <Card className="flex-1 overflow-y-auto p-4 mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-saarthi-blue text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="max-w-[75%] bg-gray-100 rounded-lg p-3 text-gray-800">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleRecording}
          className={isRecording ? "bg-red-100" : ""}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Type your message in any language${isRecording ? ' or speak...' : ''}`}
          className="flex-1 resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!inputValue.trim() || isProcessing}
          className="bg-saarthi-blue hover:bg-saarthi-chakra"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
