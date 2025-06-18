export const wizardPromptV2 = {
  name: "Création de campagne",
  steps: [
    {
      title: "Votre identité de marque",
      description: "Définissons ensemble les bases créatives de votre jeu.",
      inputs: [
        {
          type: "file-upload",
          label: "Logo de votre marque",
          accept: [".png", ".jpg", ".svg"],
          required: true
        },
        {
          type: "color-picker",
          label: "Couleurs principales",
          allowMultiple: true,
          max: 3
        },
        {
          type: "select",
          label: "Quel est le ton de votre marque ?",
          options: ["Sérieux", "Fun & engageant", "Élégant & raffiné", "Familial"],
          required: true
        },
        {
          type: "checkbox",
          label: "Objectifs de votre campagne",
          options: [
            "Collecte d’emails",
            "Trafic en point de vente",
            "Valorisation de marque",
            "Fidélisation"
          ],
          required: true
        },
        {
          type: "chips",
          label: "Votre audience principale",
          options: ["Jeunes actifs", "Seniors", "Parents", "Professionnels", "Fans de la marque"]
        },
        {
          type: "text",
          label: "Nom ou produit à mettre en avant",
          placeholder: "Ex : Tablette Facilotab Nomad 4G"
        }
      ]
    },
    {
      title: "Choix de la mécanique",
      description: "Sélectionnez la mécanique la plus adaptée à vos objectifs.",
      type: "mechanic-selector",
      options: [
        {
          label: "Roue de la fortune",
          illustration: "/img/mechanics/wheel.gif",
          description: "Faites tourner la chance ! Une mécanique simple, visuelle et très engageante."
        },
        {
          label: "Quiz interactif",
          illustration: "/img/mechanics/quiz.gif",
          description: "Testez les connaissances ou guidez vers une recommandation personnalisée."
        },
        {
          label: "Carte à gratter",
          illustration: "/img/mechanics/scratch.gif",
          description: "Une mécanique tactile et rapide, idéale pour l’instant gagnant."
        },
        {
          label: "Jackpot 3 rouleaux",
          illustration: "/img/mechanics/jackpot.gif",
          description: "Inspiré des casinos. Suspense assuré."
        }
      ]
    },
    {
      title: "Votre jeu est prêt",
      description: "Prévisualisez le rendu personnalisé selon vos choix.",
      type: "preview",
      component: "GamePreview",
      options: {
        allowEdit: true,
        allowRegenerate: true
      }
    },
    {
      title: "Personnalisation finale",
      description: "Modifiez le style, les textes ou les visuels si vous le souhaitez.",
      type: "final-editor",
      options: {
        deviceSwitch: true,
        fullCanvas: true,
        exportOptions: ["Iframe", "Lien direct", "QR code"]
      }
    }
  ]
};

export default wizardPromptV2;
