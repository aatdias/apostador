        /* <![CDATA[ */
        (function (document, window) {
            var a, c = document.createElement("script"), f = window.frameElement;

            c.id = "CleverCoreLoader61255";
            c.src = "//scripts.cleverwebserver.com/68f0f6a1277fa074f52ff5886748dbf3.js";

            c.async = !0;
            c.type = "text/javascript";
            c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
            c.setAttribute("data-callback", "put-your-callback-macro-here");

            try {
                a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
            } catch (e) {
                a = !1;
            }

            a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
            a.parentNode.insertBefore(c, a);
        })(document, window);