import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...formData } = await req.json();
    const openaiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiKey) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    // Construire le prompt optimisé pour la génération du jeu
    const prompt = `
Tu es un assistant expert en développement de mini-jeux marketing en HTML/CSS, à intégrer facilement sur le web et mobile.
Tu dois générer le code HTML et CSS complet, autonome et responsive d'un jeu sur-mesure, basé sur le brief utilisateur ci-dessous.

# Informations du projet à respecter (utilise tout, même si certains champs sont facultatifs) :

- Type de mécanique : ${formData.mechanic}
- Nom de la marque/produit : ${formData.productName}
- Logo (base64 ou URL) : ${formData.logo}
- Couleur principale : ${formData.primaryColor}
- Couleur secondaire : ${formData.secondaryColor}
- Ton de marque/ambiance : ${formData.brandTone}
- Objectifs marketing : ${Array.isArray(formData.objectives) ? formData.objectives.join(", ") : ""}
- Cible (audience) : ${Array.isArray(formData.audience) ? formData.audience.join(", ") : ""}
- Brief créatif : ${formData.brief}
- Titre du jeu : ${formData.gameTitle}
- Description affichée dans l’aperçu : ${formData.gameDescription}

# Contraintes à respecter absolument :

- Code uniquement en HTML et CSS (pas de JS externe).
- Code autonome : tout doit s’afficher correctement en copiant-collant.
- Design responsive, moderne et engageant.
- Intègre les couleurs principales (primaryColor, secondaryColor) et le ton de marque.
- Affiche le logo de la marque (si fourni).
- Ajoute un titre accrocheur (gameTitle) et une courte description (gameDescription).
- Mets en avant la mécanique choisie (“${formData.mechanic}”), en la rendant visuellement attractive.
- Optimise pour conversion : CTA visible et formulaire si “collecte d’emails” est présent dans les objectifs.
- Laisse un marquage HTML clair pour permettre des adaptations ultérieures (commentaires dans le code).
- Si besoin, ajoute une animation CSS subtile (ex : roue qui tourne doucement, effet hover sur boutons…).

# Format attendu
- Renvoie uniquement le code HTML et CSS dans une balise <html>...</html>, prêt à être utilisé dans un <iframe>.
`;

    // Appel à l’API OpenAI (GPT-4o, tu peux aussi mettre gpt-3.5-turbo si tu veux)
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Tu es un assistant expert en création de jeux HTML/CSS pour le web." },
          { role: "user", content: prompt }
        ],
        max_tokens: 2500,
        temperature: 0.5
      }),
    });

    if (!openaiRes.ok) {
      throw new Error(`OpenAI API call failed: ${openaiRes.status} ${openaiRes.statusText}`);
    }

    const openaiData = await openaiRes.json();
    const htmlContent =
      openaiData.choices &&
      openaiData.choices[0] &&
      openaiData.choices[0].message &&
      openaiData.choices[0].message.content
        ? openaiData.choices[0].message.content
        : "<html><body>Erreur de génération du jeu.</body></html>";

    return new Response(
      JSON.stringify({ html: htmlContent }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in game-generator function:", error);

    // Réponse fallback en cas d'erreur
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
    return new Response(
      JSON.stringify({
        html: fallbackHtml,
        error: error.message
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
