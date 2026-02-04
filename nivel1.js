let juegoCreado = false;

function iniciarMotorJuego(nivel) {

    if (!juegoCreado) {

        kaboom({
            width: 360,
            height: 640,
            background: [15, 5, 20],
            canvas: document.querySelector("canvas") || undefined,
        });

        loadSprite("dani", "assets/daniel.png");
        loadSprite("valery", "assets/valery.png");
        loadSprite("instituto", "assets/fondo_instituto.png");

        // -----------------------------------
        // INTRO – NARRADOR (TOUCH READY)
        // -----------------------------------
        scene("intro1", () => {

            if (height() > width()) {

                add([rect(width(), height()), color(0, 0, 0)]);

                add([
                    text("Gira tu celular\n\nPon la pantalla en horizontal\npara jugar mejor", {
                        size: 18,
                        align: "center",
                        width: width() - 40
                    }),
                    pos(width() / 2, height() / 2),
                    anchor("center")
                ]);

                add([
                    text("Toca la pantalla cuando lo gires", { size: 12 }),
                    pos(width() / 2, height() - 40),
                    anchor("center"),
                    opacity(0.6)
                ]);

                onClick(() => {
                    go("intro1");
                });

                return;
            }

            const historia = [
                "Había una vez una chica muy linda e inteligente...",
                "que usaba lentes y amaba estudiar.",
                "Un día inició sus clases en el instituto...",
                "y conoció a un chico muy apuesto, callado y tímido.",
                "Sus miradas se cruzaron por primera vez...",
                "y sin saberlo, se enamoraron a primera vista."
            ];

            let i = 0;

            add([rect(width(), height()), color(0, 0, 0)]);

            const texto = add([
                text(historia[i], {
                    size: 18,
                    width: width() - 40,
                    align: "center"
                }),
                pos(width() / 2, height() / 2),
                anchor("center")
            ]);

            add([
                text("Toca la pantalla para continuar", { size: 12 }),
                pos(width() / 2, height() - 40),
                anchor("center"),
                opacity(0.6)
            ]);

            onClick(() => {
                i++;
                if (i < historia.length) {
                    texto.text = historia[i];
                } else {
                    go("nivel1");
                }
            });

        });

        // -----------------------------------
        // NIVEL 1 – EL INSTITUTO
        // -----------------------------------
        scene("nivel1", () => {

            add([
                sprite("instituto"),
                pos(0, 0),
                scale(width() / 800, height() / 600),
                fixed()
            ]);

            add([
                rect(width(), 32),
                pos(0, 0),
                color(0, 0, 0),
                opacity(0.6),
                fixed()
            ]);

            add([
                text("Nivel 1 · El encuentro (1 / 6)", { size: 12 }),
                pos(10, 8),
                fixed()
            ]);

            const dani = add([
                sprite("dani"),
                pos(30, height() - 110),
                scale(1.4),
                area()
            ]);

            const valery = add([
                sprite("valery"),
                pos(width() - 90, height() - 110),
                scale(1.4),
                area(),
                "valery"
            ]);

            // brillo suave de Valery
            valery.onUpdate(() => {
                const s = 1.4 + Math.sin(time() * 4) * 0.05;
                valery.scale = vec2(s);
            });

            const speed = 110;
            let puedeMover = false;

            let dir = 0;

            onClick(() => {
                if (!puedeMover) return;

                dir++;
                if (dir > 3) dir = 0;

                if (dir === 0) dani.move(speed, 0);
                if (dir === 1) dani.move(-speed, 0);
                if (dir === 2) dani.move(0, -speed);
                if (dir === 3) dani.move(0, speed);
            });

            // --------------------
            // diálogo inicial
            // --------------------
            const dialogosInicio = [
                "Daniel pensaba: ¿Ella está mirándome...?",
                "Es hermosa...",
                "Profesor: ¡Preséntense por favor!"
            ];

            let di = 0;

            const caja = add([
                rect(width() - 30, 90, { radius: 10 }),
                pos(15, height() - 115),
                color(0, 0, 0),
                opacity(0.8),
                fixed()
            ]);

            const texto = add([
                text(dialogosInicio[di], { size: 14, width: width() - 50 }),
                pos(width() / 2, height() - 95),
                anchor("center"),
                fixed()
            ]);

            add([
                text("Toca la pantalla", { size: 10 }),
                pos(width() - 100, height() - 25),
                fixed(),
                opacity(0.5)
            ]);

            onClick(() => {

                if (di < dialogosInicio.length - 1) {
                    di++;
                    texto.text = dialogosInicio[di];
                } else if (!puedeMover) {
                    destroy(caja);
                    destroy(texto);
                    puedeMover = true;
                }

            });

            // --------------------
            // encuentro con Valery
            // --------------------
            let yaHablo = false;

            dani.onCollide("valery", () => {

                if (yaHablo) return;
                yaHablo = true;
                puedeMover = false;

                const dialogos = [
                    "Daniel: Hola... soy Daniel.",
                    "Valery: Hola, me llamo Valery.",
                    "Y así comenzó su primer hola..."
                ];

                let i2 = 0;

                const c2 = add([
                    rect(width() - 30, 90, { radius: 10 }),
                    pos(15, height() - 115),
                    color(0, 0, 0),
                    opacity(0.85),
                    fixed()
                ]);

                const t2 = add([
                    text(dialogos[i2], { size: 14, width: width() - 50 }),
                    pos(width() / 2, height() - 95),
                    anchor("center"),
                    fixed()
                ]);

                onClick(() => {
                    i2++;
                    if (i2 < dialogos.length) {
                        t2.text = dialogos[i2];
                    } else {

                        destroy(c2);
                        destroy(t2);

                        add([
                            text("Nivel 1 completado\n\nRegresa al mapa", {
                                size: 16,
                                align: "center",
                                width: width()
                            }),
                            pos(width() / 2, height() / 2),
                            anchor("center"),
                            fixed()
                        ]);
                    }
                });

            });

        });

        juegoCreado = true;
    }

    go("intro1");
}
