import React, { useState } from 'react';
import {
  X,
  Code2,
  Terminal,
  Copy,
  Check,
  Zap,
  CheckCircle2,
  RefreshCw,
  Key,
  Globe,
  Lock,
  Send,
  Sparkles,
  Server,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface SaaSDeveloperWebhooksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaaSDeveloperWebhooksModal: React.FC<SaaSDeveloperWebhooksModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const [apiKey, setApiKey] = useState('shopx_live_sk_948f2b1a8c9e472093bf6a81e3');
  const [copiedKey, setCopiedKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://myerp.domain.com/webhooks/shopx');
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'node' | 'python'>('node');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResponse, setTestResponse] = useState<any>(null);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSendTestWebhook = () => {
    setIsSendingTest(true);
    setTestResponse(null);
    setTimeout(() => {
      setIsSendingTest(false);
      setTestResponse({
        status: 200,
        event: 'order.created',
        deliveryTimeMs: 42,
        payload: {
          id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
          customer: { name: 'Rahim Ahmed', phone: '01711223344' },
          totalAmount: 4950,
          currency: 'BDT',
          items: [{ sku: 'HONEY-1KG', quantity: 2, price: 1050 }],
          courier: 'ShopX Rocket Express (50-Min)',
          signature: 'sha256=d7a8fbb307d7809469ca933b02...',
        },
      });
    }, 700);
  };

  const codeSnippets = {
    node: `// Node.js Webhook Receiver (Express)
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

app.post('/webhooks/shopx', (req, res) => {
  const signature = req.headers['x-shopx-signature'];
  const event = req.body.event; // 'order.created' | 'payout.disbursed'

  console.log('⚡ ShopX Event Received:', event, req.body.data);
  res.status(200).json({ received: true });
});`,
    python: `# Python Webhook Receiver (FastAPI)
from fastapi import FastAPI, Request, Header

app = FastAPI()

@app.post("/webhooks/shopx")
async def handle_shopx_event(request: Request, x_shopx_signature: str = Header(None)):
    payload = await request.json()
    event_type = payload.get("event")
    print(f"⚡ ShopX Live Event: {event_type}, Data: {payload.get('data')}")
    return {"status": "success", "received": True}`,
    curl: `# Test ShopX REST API (Create Product)
curl -X POST https://api.shopxbd.com/v1/products \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Pure Raw Honey",
    "price": 1050,
    "stock": 50,
    "category": "organic-foods"
  }'`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-500 flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/20">
            <Code2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white">
                {lang === 'bn'
                  ? 'ShopX ডেভেলপার API ও রিয়েল-টাইম ওয়েবহুক'
                  : 'ShopX SaaS Developer API & Webhooks Engine'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase">
                REST & Webhooks
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn'
                ? 'আপনার ইআরপি, পিওএস বা কাস্টম সফটওয়্যারকে ShopX ক্লাউডের সাথে সরাসরি যুক্ত করুন।'
                : 'Connect your ERP, POS, and custom accounting tools with high-speed webhooks & REST API.'}
            </p>
          </div>
        </div>

        {/* API Key Section */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 mb-4">
          <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
            <Key className="w-3.5 h-3.5 text-orange-400" />
            <span>Live Production Secret Key:</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="password"
              value={apiKey}
              readOnly
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
            />
            <button
              onClick={handleCopyKey}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition border border-slate-700"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
            </button>
          </div>
        </div>

        {/* Webhook Configuration & Tester */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mb-4">
          <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Webhook Endpoint URL:</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-400 font-mono outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSendTestWebhook}
              disabled={isSendingTest}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-1.5 transition disabled:opacity-50"
            >
              {isSendingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Send Test Ping</span>
            </button>
          </div>

          {/* Test Response Display */}
          {testResponse && (
            <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Webhook Delivered Successfully (HTTP {testResponse.status})</span>
                </span>
                <span className="text-slate-400 font-mono text-[10px]">{testResponse.deliveryTimeMs}ms</span>
              </div>
              <pre className="text-[11px] font-mono text-slate-300 bg-slate-950 p-2.5 rounded-lg overflow-x-auto">
                {JSON.stringify(testResponse.payload, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Code Snippets Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Integration Code Example:
            </span>
            <div className="flex space-x-1">
              {(['node', 'python', 'curl'] as const).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => setSelectedLanguage(langKey)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                    selectedLanguage === langKey
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {langKey}
                </button>
              ))}
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
            <code>{codeSnippets[selectedLanguage]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
