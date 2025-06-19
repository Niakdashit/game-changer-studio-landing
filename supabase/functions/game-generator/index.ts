
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...formData } = await req.json();
    const apiKey = Deno.env.get('GAME_GENERATION_API_KEY');
    
    if (!apiKey) {
      throw new Error('GAME_GENERATION_API_KEY not configured');
    }

    console.log('Processing game generation request:', { action, formData });

    // Déterminer l'endpoint basé sur l'action
    const endpoint = action === 'preview' ? '/api/preview' : '/api/generate-game';
    
    // Pour cet exemple, j'utilise un service fictif. Remplacez par votre vraie URL d'API
    const apiUrl = `https://your-api-service.com${endpoint}`;
    
    // Préparer les données pour votre API
    const apiPayload = {
      logo: formData.logo,
      primaryColor: formData.primaryColor,
      secondaryColor: formData.secondaryColor,
      brief: formData.brief,
      mechanic: formData.mechanic,
      brandTone: formData.brandTone,
      objectives: formData.objectives,
      audience: formData.audience,
      productName: formData.productName,
      gameTitle: formData.gameTitle,
      gameDescription: formData.gameDescription
    };

    console.log('Calling external API:', apiUrl, apiPayload);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-API-Key': apiKey
      },
      body: JSON.stringify(apiPayload)
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('API response received:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in game-generator function:', error);
    
    // Retourner une réponse de fallback en cas d'erreur
    const fallbackHtml = `
      <html>
        <body style="margin:0; padding:20px; font-family:Arial,sans-serif; background:linear-gradient(135deg,#667eea,#764ba2);">
          <div style="background:white; border-radius:12px; padding:20px; text-align:center; max-width:400px; margin:0 auto;">
            <h2 style="color:#333; margin:0 0 10px 0;">Jeu Généré</h2>
            <p style="color:#666; margin:0 0 20px 0;">Votre jeu personnalisé est en cours de génération...</p>
            <div style="width:80px; height:80px; border:4px solid #667eea; border-top:4px solid transparent; border-radius:50%; animation:spin 1s linear infinite; margin:0 auto;"></div>
            <style>
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
          </div>
        </body>
      </html>
    `;

    return new Response(JSON.stringify({ 
      html: fallbackHtml,
      error: error.message 
    }), {
      status: 200, // On retourne 200 pour que l'interface continue de fonctionner
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
