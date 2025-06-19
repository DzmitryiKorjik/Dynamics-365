// Active ou désactive les logs de débogage dans la console
var ShowDebugConsoleLog = true;

async function read_html() {
    try {
        if (ShowDebugConsoleLog) console.log("read_html v2 - start");

        // Accès au contexte Dynamics
        const context = window.parent.Xrm.Page;

        // Récupération du numéro de dossier et de l’URL du grand livre
        var numeroDossier = context.getAttribute("fir_numerodedossierquadratus").getValue();
        var XMLUrlentier = context.getAttribute("fir_urlloopgrandlivregeneral").getValue();
        var XMLID = XMLUrlentier ? XMLUrlentier.split("?id=")[1] : null;

        // Affichage de logs de débogage
        if (ShowDebugConsoleLog) console.log("read_html - XMLUrlentier :", XMLUrlentier);
        if (ShowDebugConsoleLog) console.log("read_html - numeroDossier :", numeroDossier);
        if (ShowDebugConsoleLog) console.log("read_html - XMLID :", XMLID);

        if (XMLUrlentier != null) {
            parent.Xrm.Utility.showProgressIndicator("Traitement");

            var baseUrl = "";
            try {
                // Récupération de l’URL personnalisée depuis un champ (optionnel)
                var attrUrl = Xrm.Page.getAttribute("crb72_urlloopgrandlivregeneral");
                baseUrl = attrUrl ? attrUrl.getValue() : "";
            } catch (e) {
                console.warn("URL dynamique non trouvée, utilisation de l'URL par défaut.");
            }

            // URL par défaut si non trouvée dans Dynamics
            if (!baseUrl) {
                baseUrl = "https://comparateur-tva.azurewebsites.net/api/comparer";
            }

            // Code d’accès à l’Azure Function
            var codeParam = "KEY_AZURE";

            // Construction de l’URL d’appel de l’Azure Function
            var fullUrl = baseUrl +
                "?code=" + encodeURIComponent(codeParam) +
                "&id=" + encodeURIComponent(XMLID) +
                "&codeDossier=" + encodeURIComponent(numeroDossier) +
                "&iframe=1"; // Paramètre spécifique pour le mode iframe

            if (ShowDebugConsoleLog) console.log("URL iframe cible :", fullUrl);

            // Création et injection d’un iframe dans la page
            var iframe = document.createElement("iframe");
            iframe.src = fullUrl;
            iframe.style.width = "100%";
            iframe.style.height = "2000px"; 
            iframe.style.border = "none";
            iframe.setAttribute("title", "Comparateur TVA");

            document.getElementById("contenu").innerHTML = ""; // Nettoyage du contenu existant
            document.getElementById("contenu").appendChild(iframe);

            parent.Xrm.Utility.closeProgressIndicator();
        } else {
            // Affichage d’un message si l’URL est absente
            parent.Xrm.Navigation.openAlertDialog({
                text: "Merci de remplir l'URL Loop du grand livre général",
                title: "Pas d’URL renseignée"
            });
        }

        if (ShowDebugConsoleLog) console.log("read_html - end");

    } catch (e) {
        // Gestion des erreurs
        parent.Xrm.Navigation.openAlertDialog({ text: e.message, title: "Error read_html" });
        parent.Xrm.Utility.closeProgressIndicator();
    }
}
