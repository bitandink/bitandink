"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import type {
  EnvSendState,
  PlaygroundObserver,
  PlaygroundScene,
  SessionLog,
} from "../types";

/*
 * Temporary import.
 * Keep the old CSS connected until playground.module.css is extracted
 * and visually verified.
 */
import styles from "../styles/playground.module.css";

export default function PlaygroundView() {
  const playgroundTimersRef = useRef<number[]>([]);
  const txtTimersRef = useRef<number[]>([]);
  const readmeTimersRef = useRef<number[]>([]);
  const logScrollRef = useRef<HTMLDivElement | null>(null);
  const thudAudioRef = useRef<HTMLAudioElement | null>(null);

  const [playgroundScene, setPlaygroundScene] =
    useState<PlaygroundScene>("idle");

  const [playgroundObserver, setPlaygroundObserver] =
    useState<PlaygroundObserver>(null);

  const [
    beanGiftBubbleVisible,
    setBeanGiftBubbleVisible,
  ] = useState(false);

  const [
    giftBalloonPopped,
    setGiftBalloonPopped,
  ] = useState(false);

  const [txtViewerOpen, setTxtViewerOpen] =
    useState(false);

  const [txtStep, setTxtStep] = useState(0);

  const [logPanelOpen, setLogPanelOpen] =
    useState(false);

  const [
    readmePanelOpen,
    setReadmePanelOpen,
  ] = useState(false);

  const [readmeStep, setReadmeStep] =
    useState(0);

  const [sessionLogs, setSessionLogs] =
    useState<SessionLog[]>([]);

  const [cssLabOpen, setCssLabOpen] =
    useState(false);

  const [cssLabFontSize, setCssLabFontSize] =
    useState(18);

  const [cssLabRadius, setCssLabRadius] =
    useState(14);

  const [
    cssLabLetterSpacing,
    setCssLabLetterSpacing,
  ] = useState(0.02);

  const [cssLabRotate, setCssLabRotate] =
    useState(0);

  const [cssLabOpacity, setCssLabOpacity] =
    useState(0.92);

  const [envPanelOpen, setEnvPanelOpen] =
    useState(false);

  const [envBootStep, setEnvBootStep] =
    useState(0);

  const [envNote, setEnvNote] = useState("");

  const [envSendState, setEnvSendState] =
    useState<EnvSendState>("idle");

  const [envSendMessage, setEnvSendMessage] =
    useState("");

  const getLogTime = () => {
    const now = new Date();

    return [
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ]
      .map((value) =>
        String(value).padStart(2, "0")
      )
      .join(":");
  };

  const appendSessionLog = (
    level: string,
    message: string
  ) => {
    setSessionLogs((current) => {
      const next = [
        ...current,
        {
          id:
            Date.now() +
            Math.floor(Math.random() * 1000),
          time: getLogTime(),
          level,
          message,
        },
      ];

      return next.slice(-64);
    });
  };

  const clearReadmeTimers = () => {
    readmeTimersRef.current.forEach((timer) => {
      window.clearTimeout(timer);
    });

    readmeTimersRef.current = [];
  };

  const scheduleReadme = (
    callback: () => void,
    delay: number
  ) => {
    const timer = window.setTimeout(
      callback,
      delay
    );

    readmeTimersRef.current.push(timer);
  };

  const closeReadmePanel = () => {
    clearReadmeTimers();
    setReadmeStep(0);
    setReadmePanelOpen(false);
  };

  const closeLogPanel = () => {
    setLogPanelOpen(false);
  };

  const clearPlaygroundTimers = () => {
    playgroundTimersRef.current.forEach(
      (timer) => {
        window.clearTimeout(timer);
      }
    );

    playgroundTimersRef.current = [];
  };

  const schedulePlayground = (
    callback: () => void,
    delay: number
  ) => {
    const timer = window.setTimeout(
      callback,
      delay
    );

    playgroundTimersRef.current.push(timer);
  };

  const clearTxtTimers = () => {
    txtTimersRef.current.forEach((timer) => {
      window.clearTimeout(timer);
    });

    txtTimersRef.current = [];
  };

  const scheduleTxt = (
    callback: () => void,
    delay: number
  ) => {
    const timer = window.setTimeout(
      callback,
      delay
    );

    txtTimersRef.current.push(timer);
  };

  const closeTxtViewer = () => {
    clearTxtTimers();
    setTxtStep(0);
    setTxtViewerOpen(false);
  };

  const openLogPanel = () => {
    closeTxtViewer();
    closeReadmePanel();
    setCssLabOpen(false);
    setEnvPanelOpen(false);
    setLogPanelOpen(true);

    appendSessionLog(
      "ACCESS",
      ".log opened"
    );
  };

  const openReadmePanel = () => {
    closeTxtViewer();
    closeLogPanel();
    clearReadmeTimers();

    setCssLabOpen(false);
    setEnvPanelOpen(false);
    setReadmeStep(0);
    setReadmePanelOpen(true);

    appendSessionLog(
      "ACCESS",
      "README.md opened"
    );

    scheduleReadme(
      () => {
        setReadmeStep(1);

        appendSessionLog(
          "WARN",
          "README status modified by HODU"
        );
      },
      3200
    );

    scheduleReadme(
      () => {
        setReadmeStep(2);

        appendSessionLog(
          "???",
          "PAMA approved own supervision status"
        );
      },
      6100
    );
  };

  const openTxtViewer = () => {
    clearTxtTimers();

    setCssLabOpen(false);
    setEnvPanelOpen(false);
    closeLogPanel();
    closeReadmePanel();
    setTxtStep(0);
    setTxtViewerOpen(true);

    appendSessionLog(
      "ACCESS",
      ".txt opened"
    );

    scheduleTxt(() => {
      setTxtStep(1);
      appendSessionLog(
        "TRACE",
        "HODU entered text buffer"
      );
    }, 1900);

    scheduleTxt(() => {
      setTxtStep(2);
      appendSessionLog(
        "WARN",
        "character count changed: 43 → 42"
      );
    }, 5700);

    scheduleTxt(() => {
      setTxtStep(3);
      appendSessionLog(
        "TRACE",
        "missing character located near HODU"
      );
    }, 9800);

    scheduleTxt(() => {
      setTxtStep(4);
      appendSessionLog(
        "INFO",
        'BEAN restored "다"'
      );
    }, 12300);

    scheduleTxt(() => {
      setTxtStep(5);
      appendSessionLog(
        "EVENT",
        "PAMA entered text buffer"
      );
    }, 14200);

    scheduleTxt(() => {
      setTxtStep(6);
      appendSessionLog(
        "WARN",
        "unexpected character displacement"
      );
    }, 16500);

    scheduleTxt(() => {
      setTxtStep(7);
      appendSessionLog(
        "TRACE",
        "BEAN is staring at PAMA"
      );
    }, 18400);

    scheduleTxt(() => {
      setTxtStep(8);
      appendSessionLog(
        "INFO",
        'PAMA: "잘들 논다~"'
      );
    }, 21100);

    scheduleTxt(() => {
      setTxtStep(9);

      appendSessionLog(
        "INFO",
        "BEAN restored document"
      );

      appendSessionLog(
        "WARN",
        "BEAN patience level: 12%"
      );
    }, 23300);

    scheduleTxt(
      () => setTxtStep(10),
      25000
    );
  };

  const startHoduSequence = () => {
    if (
      playgroundScene !== "idle" &&
      playgroundScene !== "gift"
    ) {
      return;
    }

    clearPlaygroundTimers();
    setPlaygroundObserver(null);
    setBeanGiftBubbleVisible(false);
    setGiftBalloonPopped(false);
    setPlaygroundScene("chasing");

    appendSessionLog(
      "WARN",
      "HODU attempted to capture data"
    );

    schedulePlayground(() => {
      setPlaygroundScene("fallen");

      appendSessionLog(
        "FAIL",
        "data capture failed"
      );

      appendSessionLog(
        "THUD",
        "HODU hit the floor"
      );

      const thud = thudAudioRef.current;

      if (thud) {
        thud.currentTime = 0;

        void thud.play().catch(() => {});
      }
    }, 1450);

    schedulePlayground(() => {
      setPlaygroundScene("comforting");

      appendSessionLog(
        "INFO",
        "BEAN initiating recovery"
      );
    }, 2650);

    schedulePlayground(() => {
      setPlaygroundScene("gift");
      setBeanGiftBubbleVisible(true);

      appendSessionLog(
        "INFO",
        "BEAN provided replacement data"
      );

      schedulePlayground(() => {
        setBeanGiftBubbleVisible(false);
      }, 1800);
    }, 4100);
  };

  const popGiftBalloon = () => {
    if (
      playgroundScene !== "gift" ||
      giftBalloonPopped
    ) {
      return;
    }

    const pop = new Audio(
      "/bitandink/sounds/pop.wav"
    );

    pop.volume = 0.4;

    void pop.play().catch((error) => {
      console.error(
        "POP SOUND ERROR:",
        error
      );
    });

    setBeanGiftBubbleVisible(false);
    setGiftBalloonPopped(true);

    appendSessionLog(
      "EVENT",
      "JSON balloon popped"
    );

    appendSessionLog(
      "???",
      "snack precipitation detected"
    );
  };

  const resetPlayground = () => {
    clearPlaygroundTimers();
    clearTxtTimers();
    clearReadmeTimers();

    setPlaygroundObserver(null);
    setBeanGiftBubbleVisible(false);
    setGiftBalloonPopped(false);

    setTxtViewerOpen(false);
    setTxtStep(0);

    setLogPanelOpen(false);

    setReadmePanelOpen(false);
    setReadmeStep(0);

    setCssLabOpen(false);
    setEnvPanelOpen(false);

    setPlaygroundScene("idle");
  };

  const sendEnvNote = async () => {
    const note = envNote.trim();

    if (
      !note ||
      envSendState === "sending"
    ) {
      return;
    }

    setEnvSendState("sending");
    setEnvSendMessage(
      "> transmitting private variable..."
    );

    try {
      const response = await fetch(
        "/api/env-note",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ note }),
        }
      );

      const payload = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            "Transmission failed."
        );
      }

      setEnvSendState("sent");
      setEnvSendMessage(
        "> delivered to bitandink.\n> variable cleared."
      );
      setEnvNote("");

      appendSessionLog(
        "SENT",
        "anonymous variable delivered"
      );
    } catch {
      setEnvSendState("error");
      setEnvSendMessage(
        "> transmission failed. try again later."
      );

      appendSessionLog(
        "FAIL",
        "private variable transmission failed"
      );
    }
  };

  useEffect(() => {
    appendSessionLog(
      "INFO",
      "playground initialized"
    );

    appendSessionLog(
      "OK",
      "resident.bean connected"
    );

    appendSessionLog(
      "OK",
      "resident.pama connected"
    );

    appendSessionLog(
      "WARN",
      "resident.hodu detected"
    );
  }, []);

  useEffect(() => {
    if (!logPanelOpen) {
      return;
    }

    window.requestAnimationFrame(() => {
      const scroller = logScrollRef.current;

      if (!scroller) {
        return;
      }

      scroller.scrollTop =
        scroller.scrollHeight;
    });
  }, [logPanelOpen, sessionLogs]);

  useEffect(() => {
    if (!envPanelOpen) {
      setEnvBootStep(0);
      setEnvSendState("idle");
      setEnvSendMessage("");
      return;
    }

    setEnvBootStep(0);

    const timers = [
      window.setTimeout(
        () => setEnvBootStep(1),
        260
      ),
      window.setTimeout(
        () => setEnvBootStep(2),
        620
      ),
      window.setTimeout(
        () => setEnvBootStep(3),
        980
      ),
      window.setTimeout(
        () => setEnvBootStep(4),
        1360
      ),
    ];

    return () => {
      timers.forEach((timer) =>
        window.clearTimeout(timer)
      );
    };
  }, [envPanelOpen]);

  useEffect(() => {
    const audio = new Audio(
      "/bitandink/sounds/thud.wav"
    );

    audio.volume = 0.25;
    thudAudioRef.current = audio;

    return () => {
      audio.pause();
      thudAudioRef.current = null;
    };
  }, []);

  /*
   * The old component reset Playground when activeView changed.
   * This is now a real route, so cleanup happens when the page unmounts.
   */
  useEffect(() => {
    return () => {
      clearPlaygroundTimers();
      clearTxtTimers();
      clearReadmeTimers();
    };
  }, []);

  return (
<article
  className={[
    styles.currentDocument,
    styles.workspaceDocument,
    styles.playgroundDocument,
  ].join(" ")}
>
  <header
    className={styles.playgroundHeading}
  >
    <span
      className={styles.documentIndex}
    >
      05 / LAB
    </span>

    <h2>Playground</h2>

    <p>
      여긴 별로 쓸모 있는 건 없다.
    </p>

    <span
      className={styles.playgroundAside}
    >
      대신, 누르면 뭔가 일어날 수도 있다.
    </span>

    <span
      className={styles.playgroundStatus}
    >
      STATUS / QUESTIONABLE
    </span>
  </header>

  <section
    className={[
      styles.playgroundStage,
      styles[
        `playgroundScene_${playgroundScene}`
      ],
      txtViewerOpen
        ? styles.playgroundSceneTxtOpen
        : "",
    ]
      .filter(Boolean)
      .join(" ")}
    aria-label="Beanlog resident playground"
  >
    <div
      className={styles.playgroundHint}
    >
      <span>HINT_01</span>
      <p>
        떠다니는 데이터를 누르거나,
        캐릭터를 클릭해 보자.
      </p>
    </div>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataOne,
      ].join(" ")}
      onClick={openReadmePanel}
      aria-label="Open Playground README"
    >
      .md
    </button>

    <a
      className={[
        styles.playData,
        styles.playDataTwo,
      ].join(" ")}
      href="https://bitandink.github.io/portfolio-2026/"
      target="_blank"
      rel="noreferrer"
      aria-label="Open bitandink web portfolio"
    >
      .json
    </a>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataThree,
      ].join(" ")}
      onClick={() => {
        closeTxtViewer();
        closeLogPanel();
        closeReadmePanel();
        setEnvPanelOpen(false);
        setCssLabOpen(true);

        appendSessionLog(
          "ACCESS",
          ".css lab opened"
        );
      }}
      aria-label="Open CSS Lab"
    >
      .css
    </button>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataFour,
      ].join(" ")}
      onClick={openTxtViewer}
      aria-label="Open text viewer"
    >
      .txt
    </button>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataFive,
      ].join(" ")}
      onClick={startHoduSequence}
      aria-label="Catch tsx data"
    >
      .tsx
    </button>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataSix,
      ].join(" ")}
      onClick={openLogPanel}
      aria-label="Open activity log"
    >
      .log
    </button>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataSeven,
      ].join(" ")}
      onClick={() => {
        closeTxtViewer();
        closeLogPanel();
        closeReadmePanel();
        setCssLabOpen(false);
        setEnvPanelOpen(true);

        appendSessionLog(
          "ACCESS",
          ".env opened"
        );
      }}
      aria-label="Open private env note"
    >
      .env
    </button>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataEight,
      ].join(" ")}
      onClick={startHoduSequence}
      aria-label="Catch yaml data"
    >
      .yml
    </button>

    <a
      className={[
        styles.playData,
        styles.playDataNine,
      ].join(" ")}
      href="https://github.com/bitandink"
      target="_blank"
      rel="noreferrer"
      aria-label="Open bitandink GitHub"
    >
      .git
    </a>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataTen,
      ].join(" ")}
      onClick={startHoduSequence}
      aria-label="Catch binary data"
    >
      0101
    </button>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataEleven,
      ].join(" ")}
      onClick={startHoduSequence}
      aria-label="Catch unknown data"
    >
      ???
    </button>

    <button
      type="button"
      className={[
        styles.playData,
        styles.playDataTwelve,
      ].join(" ")}
      onClick={startHoduSequence}
      aria-label="Catch archive data"
    >
      .zip
    </button>

    <button
      type="button"
      className={styles.pamaActor}
      onClick={() =>
        setPlaygroundObserver(
          playgroundObserver === "pama"
            ? null
            : "pama"
        )
      }
      aria-label="Talk to Pama"
    >
      <img
        src="/bitandink/characters/pama/pama.webp"
        alt="Pama"
      />

      {playgroundObserver === "pama" ? (
        <span
          className={styles.actorBubble}
        >
          또 저런다.
        </span>
      ) : null}
    </button>

    <button
      type="button"
      className={styles.bitandinkActor}
      onClick={() =>
        setPlaygroundObserver(
          playgroundObserver === "bitandink"
            ? null
            : "bitandink"
        )
      }
      aria-label="Talk to bitandink"
    >
      <img
        src="/bitandink/characters/bai/bitandink-front.webp"
        alt="bitandink"
      />

      {playgroundObserver === "bitandink" ? (
        <span
          className={styles.actorBubble}
        >
          원래 이거 포트폴리오였는데.
        </span>
      ) : null}
    </button>

    <div
      className={styles.hoduActor}
    >
      <button
        type="button"
        className={styles.actorButton}
        onClick={startHoduSequence}
        aria-label="Play with Hodu"
      >
        <img
          src={
            playgroundScene === "chasing"
              ? "/bitandink/characters/hodu/hodu-jump.webp"
              : playgroundScene === "fallen"
                ? "/bitandink/characters/hodu/hodu-crash.webp"
                : playgroundScene === "comforting"
                  ? "/bitandink/characters/hodu/hodu-down.webp"
                  : playgroundScene === "gift"
                    ? "/bitandink/characters/hodu/hodu-idle.webp"
                    : "/bitandink/characters/hodu/hodu.webp"
          }
          alt="Hodu"
        />
      </button>

      {playgroundScene === "idle" ? (
        <span
          className={styles.hoduBubble}
        >
          저건 뭐지?
        </span>
      ) : null}

      {playgroundScene === "fallen" ? (
        <span
          className={styles.hoduBubble}
        >
          ...
        </span>
      ) : null}
    </div>

    <div
      className={styles.beanActor}
    >
      <img
        src="/bitandink/characters/bean/bean.webp"
        alt="Bean"
      />

      {playgroundScene === "comforting" ? (
        <span
          className={styles.beanBubble}
        >
          또 놓쳤어?
        </span>
      ) : null}

      {playgroundScene === "gift" &&
      beanGiftBubbleVisible ? (
        <span
          className={styles.beanBubble}
        >
          이건 안 도망가.
        </span>
      ) : null}
    </div>

    <button
      type="button"
      className={[
        styles.dataBalloon,
        giftBalloonPopped
          ? styles.dataBalloonPopped
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={popGiftBalloon}
      disabled={
        playgroundScene !== "gift" ||
        giftBalloonPopped
      }
      aria-label="Pop Bean's JSON balloon"
      aria-hidden={
        playgroundScene !== "gift"
      }
    >
      <span>.json</span>
      <i />
    </button>

    {playgroundScene === "gift" &&
    giftBalloonPopped ? (
      <div
        className={styles.snackRain}
        aria-hidden="true"
      >
        {[
          ["🍪", "-82px", "-16deg", "0ms"],
          ["🦴", "-54px", "18deg", "90ms"],
          ["🍪", "-28px", "-28deg", "160ms"],
          ["🦴", "0px", "12deg", "40ms"],
          ["🍪", "26px", "24deg", "210ms"],
          ["🦴", "52px", "-18deg", "120ms"],
          ["🍪", "78px", "30deg", "260ms"],
          ["🦴", "96px", "-8deg", "320ms"],
          ["🍪", "-98px", "20deg", "300ms"],
        ].map(
          ([snack, x, rotate, delay], index) => (
            <span
              key={`${snack}-${index}`}
              style={
                {
                  "--snack-x": x,
                  "--snack-rotate": rotate,
                  "--snack-delay": delay,
                } as CSSProperties
              }
            >
              {snack}
            </span>
          )
        )}
      </div>
    ) : null}

    {playgroundScene === "gift" ? (
      <button
        type="button"
        className={styles.playAgain}
        onClick={resetPlayground}
      >
        again? ↺
      </button>
    ) : null}

    {readmePanelOpen ? (
      <aside
        className={styles.readmePanel}
        aria-label="Playground README"
      >
        <div
          className={styles.readmeHeader}
        >
          <div>
            <span>README.md</span>
            <strong>
              bitandink / playground
            </strong>
          </div>

          <button
            type="button"
            className={styles.readmeClose}
            onClick={closeReadmePanel}
            aria-label="Close Playground README"
          >
            ×
          </button>
        </div>

        <div
          className={styles.readmeBody}
        >
          <section
            className={styles.readmeIntro}
          >
            <span
              className={styles.readmeEyebrow}
            >
              # bitandink / playground
            </span>

            <p>
              a tiny place where code,
              characters, and unnecessary
              interactions live.
            </p>
          </section>

          <section
            className={styles.readmeSection}
          >
            <h3>## residents</h3>

            <div
              className={styles.readmeResidents}
            >
              <article>
                <strong>BEAN</strong>
                <p>
                  maintains the system.
                  <br />
                  fixes things nobody asked
                  HODU to break.
                </p>
              </article>

              <article>
                <strong>HODU</strong>
                <p>
                  professional troublemaker.
                  <br />
                  occasionally steals text
                  and chases data.
                </p>
              </article>

              <article>
                <strong>PAMA</strong>
                <p>
                  mostly observes.
                  <br />
                  occasionally makes things
                  worse.
                </p>
              </article>

              <article>
                <strong>bitandink</strong>
                <p>
                  built this place.
                  <br />
                  claims everything is
                  intentional.
                </p>
              </article>
            </div>
          </section>

          <section
            className={[
              styles.readmeSection,
              styles.readmeStatusSection,
            ].join(" ")}
          >
            <h3>## status</h3>

            <div
              className={styles.readmeStatusList}
            >
              <p>
                <span>✓</span>
                system online
              </p>

              <p>
                <span>✓</span>
                bean working
              </p>

              <p
                className={
                  readmeStep >= 1
                    ? styles.readmeStatusTampered
                    : ""
                }
              >
                <span>
                  {readmeStep >= 1
                    ? "?"
                    : "✓"}
                </span>
                hodu supervised

                {readmeStep >= 1 ? (
                  <em>
                    // probably not
                  </em>
                ) : null}
              </p>

              <p
                className={
                  readmeStep >= 2
                    ? styles.readmeStatusPama
                    : ""
                }
              >
                <span>
                  {readmeStep >= 2
                    ? "✓"
                    : "△"}
                </span>
                pama unsupervised

                {readmeStep >= 2 ? (
                  <em>
                    // self-approved
                  </em>
                ) : null}
              </p>
            </div>
          </section>

          <footer
            className={styles.readmeFooter}
          >
            <span>
              // no useful features were
              harmed in the making of this
              playground.
            </span>

            <a
              href="https://orange-periwinkle-04b.notion.site/2ef3b18f802880fc8851d0175a7c5398"
              target="_blank"
              rel="noreferrer"
            >
              portfolio ↗
            </a>
          </footer>
        </div>
      </aside>
    ) : null}

    {logPanelOpen ? (
      <aside
        className={styles.logPanel}
        aria-label="Playground activity log"
      >
        <div
          className={styles.logPanelHeader}
        >
          <div>
            <span>ACTIVITY LOG</span>
            <strong>
              playground.log
            </strong>
          </div>

          <button
            type="button"
            className={styles.logPanelClose}
            onClick={closeLogPanel}
            aria-label="Close activity log"
          >
            ×
          </button>
        </div>

        <div
          ref={logScrollRef}
          className={styles.logTerminal}
          aria-live="polite"
        >
          {sessionLogs.map((entry) => (
            <div
              key={entry.id}
              className={styles.logRow}
            >
              <time>{entry.time}</time>

              <span
                className={[
                  styles.logLevel,
                  styles[
                    `logLevel_${entry.level.replace(
                      /[^a-zA-Z]/g,
                      ""
                    )}`
                  ],
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                [{entry.level}]
              </span>

              <p>{entry.message}</p>
            </div>
          ))}

          <div
            className={[
              styles.logRow,
              styles.logRowSystem,
            ].join(" ")}
          >
            <time>--:--:--</time>
            <span
              className={styles.logLevel}
            >
              [SYSTEM]
            </span>
            <p>
              everything is under control.
            </p>
          </div>

          <div
            className={[
              styles.logRow,
              styles.logRowSystem,
            ].join(" ")}
          >
            <time>--:--:--</time>
            <span
              className={styles.logLevel}
            >
              [SYSTEM]
            </span>
            <p>probably.</p>
          </div>
        </div>

        <div
          className={styles.logPanelFooter}
        >
          <span>
            session only / not persisted
          </span>

          <span>
            {sessionLogs.length} events
          </span>
        </div>
      </aside>
    ) : null}

    {txtViewerOpen ? (
      <aside
        className={styles.txtViewerPanel}
        aria-label="Text viewer"
      >
        <div
          className={styles.txtViewerHeader}
        >
          <div>
            <span>TEXT VIEWER</span>
            <strong>sample.txt</strong>
          </div>

          <button
            type="button"
            className={styles.txtViewerClose}
            onClick={closeTxtViewer}
            aria-label="Close text viewer"
          >
            ×
          </button>
        </div>

        <div
          className={styles.txtViewerBody}
        >
          <div
            className={styles.txtPaper}
          >
            <p>
              오늘도 데이터는{" "}
              <span
                className={[
                  styles.txtCharacter,
                  txtStep >= 6 &&
                  txtStep < 9
                    ? styles.txtCharacterNudged
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                조
              </span>
              용히 흐르고 있다.
            </p>

            <p>
              아무 일도 일어나지 않을 것이
              <span
                className={[
                  styles.txtCharacter,
                  txtStep >= 2 &&
                  txtStep < 4
                    ? styles.txtCharacterMissing
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                다
              </span>
              .
            </p>

            <p>아마도.</p>
          </div>

          <div
            className={styles.txtMeta}
          >
            <span>
              characters
              <strong>
                {txtStep >= 2 &&
                txtStep < 4
                  ? "42"
                  : "43"}
              </strong>
            </span>

            <span>
              status
              <strong>
                {txtStep === 0
                  ? "stable"
                  : txtStep === 1
                    ? "suspicious"
                    : txtStep >= 2 &&
                        txtStep < 4
                      ? "corrupted"
                      : txtStep === 4
                        ? "restored"
                        : txtStep >= 6 &&
                            txtStep < 9
                          ? "...seriously?"
                          : txtStep >= 9
                            ? "stable"
                            : "watching"}
              </strong>
            </span>
          </div>

          {txtStep >= 1 &&
          txtStep < 4 ? (
            <div
              className={[
                styles.txtHodu,
                txtStep >= 2
                  ? styles.txtHoduEscape
                  : styles.txtHoduApproach,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <img
                src={
                  txtStep === 1
                    ? "/bitandink/characters/hodu/hodu-sneak.webp"
                    : txtStep === 2
                      ? "/bitandink/characters/hodu/hodu-steal.webp"
                      : "/bitandink/characters/hodu/hodu-escape.webp"
                }
                alt=""
              />

              {txtStep >= 2 ? (
                <span
                  className={styles.txtStolenLetter}
                >
                  다
                </span>
              ) : null}
            </div>
          ) : null}

          {txtStep >= 3 &&
          txtStep < 10 ? (
            <div
              className={[
                styles.txtBean,
                txtStep === 3
                  ? styles.txtBeanRetrieve
                  : "",
                txtStep === 5 ||
                txtStep === 6 ||
                txtStep === 8 ||
                txtStep === 9
                  ? styles.txtBeanPamaScale
                  : "",
                txtStep === 7
                  ? styles.txtBeanStare
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <img
                src={
                  txtStep === 3
                    ? "/bitandink/characters/bean/bean-retrieve.webp"
                    : txtStep === 4
                      ? "/bitandink/characters/bean/bean-arrange.webp"
                      : txtStep === 7
                        ? "/bitandink/characters/bean/bean-stare.webp"
                        : txtStep === 9
                          ? "/bitandink/characters/bean/bean-sigh.webp"
                          : "/bitandink/characters/bean/bean-working.webp"
                }
                alt=""
              />

              {txtStep === 3 ? (
                <span
                  className={styles.txtResidentBubble}
                >
                  하아...
                </span>
              ) : null}

              {txtStep === 7 ? (
                <span
                  className={styles.txtResidentBubble}
                >
                  ...
                </span>
              ) : null}

              {txtStep === 9 ? (
                <span
                  className={styles.txtResidentBubble}
                >
                  하아........
                </span>
              ) : null}
            </div>
          ) : null}

          {txtStep >= 5 &&
          txtStep <= 9 ? (
            <div
              className={[
                styles.txtPama,
                txtStep === 5
                  ? styles.txtPamaWalk
                  : "",
                txtStep === 6 ||
                txtStep === 7 ||
                txtStep === 8
                  ? styles.txtPamaPause
                  : "",
                txtStep === 9
                  ? styles.txtPamaLeave
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <img
                src={
                  txtStep === 5
                    ? "/bitandink/characters/pama/pama-walk.webp"
                    : txtStep === 6
                      ? "/bitandink/characters/pama/pama-nudge.webp"
                      : txtStep === 7
                        ? "/bitandink/characters/pama/pama-caught.webp"
                        : txtStep === 8
                          ? "/bitandink/characters/pama/pama-walk.webp"
                          : "/bitandink/characters/pama/pama-leave.webp"
                }
                alt=""
              />

              {txtStep === 8 ? (
                <span
                  className={[
                    styles.txtResidentBubble,
                    styles.txtPamaBubble,
                  ].join(" ")}
                >
                  잘들 논다~
                </span>
              ) : null}
            </div>
          ) : null}

          {txtStep === 6 ? (
            <span
              className={styles.txtNudgeMark}
              aria-hidden="true"
            >
              툭
            </span>
          ) : null}
        </div>

        <div
          className={styles.txtViewerFooter}
        >
          <span>
            encoding / UTF-8
          </span>

          <span>
            readonly-ish
          </span>
        </div>
      </aside>
    ) : null}

    {envPanelOpen ? (
      <aside
        className={styles.envPanel}
        aria-label="Private env note"
      >
        <div
          className={styles.envPanelHeader}
        >
          <div>
            <span>.env</span>
            <strong>
              PRIVATE CHANNEL
            </strong>
          </div>

          <button
            type="button"
            className={styles.envPanelClose}
            onClick={() =>
              setEnvPanelOpen(false)
            }
            aria-label="Close private env note"
          >
            ×
          </button>
        </div>

        <div
          className={styles.envTerminal}
          aria-live="polite"
        >
          <p>$ open .env</p>

          {envBootStep >= 1 ? (
            <p>
              &gt; loading private variables...
            </p>
          ) : null}

          {envBootStep >= 2 ? (
            <p>
              &gt; visitor detected.
            </p>
          ) : null}

          {envBootStep >= 3 ? (
            <p>
              &gt; opening private channel...
            </p>
          ) : null}

          {envBootStep >= 4 ? (
            <p
              className={
                styles.envTerminalReady
              }
            >
              &gt; access granted.
            </p>
          ) : null}
        </div>

        {envBootStep >= 4 ? (
          <div
            className={styles.envNoteArea}
          >
            <div
              className={styles.envNotice}
            >
              <span>
                SECRET_NOTE=
              </span>

              <p>
                bitandink에게만 남기고 싶은
                한 문장을 적어도 된다.
              </p>

              <small>
                전송된 메모는 이메일로 전달된다.
              </small>
            </div>

            <textarea
              value={envNote}
              onChange={(event) => {
                setEnvNote(
                  event.target.value.slice(
                    0,
                    1000
                  )
                );

                if (
                  envSendState === "error"
                ) {
                  setEnvSendState("idle");
                  setEnvSendMessage("");
                }
              }}
              maxLength={1000}
              placeholder="type something..."
              aria-label="Secret note to bitandink"
            />

            <div
              className={styles.envNoteFooter}
            >
              <span>
                {envNote.length} / 1000
              </span>

              <button
                type="button"
                onClick={sendEnvNote}
                disabled={
                  !envNote.trim() ||
                  envSendState ===
                    "sending"
                }
              >
                {envSendState ===
                "sending"
                  ? "sending..."
                  : "send variable"}
              </button>
            </div>

            {envSendMessage ? (
              <pre
                className={[
                  styles.envSendStatus,
                  envSendState === "sent"
                    ? styles.envSendSuccess
                    : "",
                  envSendState === "error"
                    ? styles.envSendError
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {envSendMessage}
              </pre>
            ) : null}

            <p
              className={styles.envFootnote}
            >
              // never commit .env
            </p>
          </div>
        ) : null}
      </aside>
    ) : null}

    {cssLabOpen ? (
      <aside
        className={styles.cssLabPanel}
        aria-label="CSS Lab"
      >
        <div
          className={styles.cssLabHeader}
        >
          <div>
            <span>CSS LAB</span>
            <strong>
              live style test
            </strong>
          </div>

          <button
            type="button"
            className={styles.cssLabClose}
            onClick={() =>
              setCssLabOpen(false)
            }
            aria-label="Close CSS Lab"
          >
            ×
          </button>
        </div>

        <div
          className={styles.cssLabBody}
        >
          <div
            className={styles.cssLabControls}
          >
            <label>
              <span>
                font-size
                <em>
                  {cssLabFontSize}px
                </em>
              </span>

              <input
                type="range"
                min="12"
                max="32"
                value={cssLabFontSize}
                onChange={(event) =>
                  setCssLabFontSize(
                    Number(
                      event.target.value
                    )
                  )
                }
              />
            </label>

            <label>
              <span>
                border-radius
                <em>
                  {cssLabRadius}px
                </em>
              </span>

              <input
                type="range"
                min="0"
                max="32"
                value={cssLabRadius}
                onChange={(event) =>
                  setCssLabRadius(
                    Number(
                      event.target.value
                    )
                  )
                }
              />
            </label>

            <label>
              <span>
                letter-spacing
                <em>
                  {cssLabLetterSpacing.toFixed(
                    2
                  )}
                  em
                </em>
              </span>

              <input
                type="range"
                min="-0.04"
                max="0.16"
                step="0.01"
                value={cssLabLetterSpacing}
                onChange={(event) =>
                  setCssLabLetterSpacing(
                    Number(
                      event.target.value
                    )
                  )
                }
              />
            </label>

            <label>
              <span>
                rotate
                <em>
                  {cssLabRotate}deg
                </em>
              </span>

              <input
                type="range"
                min="-12"
                max="12"
                value={cssLabRotate}
                onChange={(event) =>
                  setCssLabRotate(
                    Number(
                      event.target.value
                    )
                  )
                }
              />
            </label>

            <label>
              <span>
                opacity
                <em>
                  {cssLabOpacity.toFixed(
                    2
                  )}
                </em>
              </span>

              <input
                type="range"
                min="0.35"
                max="1"
                step="0.05"
                value={cssLabOpacity}
                onChange={(event) =>
                  setCssLabOpacity(
                    Number(
                      event.target.value
                    )
                  )
                }
              />
            </label>
          </div>

          <div
            className={styles.cssLabPreviewWrap}
          >
            <div
              className={styles.cssLabPreview}
              style={{
                fontSize:
                  cssLabFontSize,
                borderRadius:
                  cssLabRadius,
                letterSpacing:
                  `${cssLabLetterSpacing}em`,
                transform:
                  `rotate(${cssLabRotate}deg)`,
                opacity:
                  cssLabOpacity,
              }}
            >
              <span>
                .demo
              </span>

              <strong>
                CSS는 생각보다
                많이 움직인다.
              </strong>

              <p>
                값을 바꾸면 바로
                여기서 확인할 수 있다.
              </p>
            </div>

            <pre
              className={styles.cssLabCode}
            >
{`.demo {
  font-size: ${cssLabFontSize}px;
  border-radius: ${cssLabRadius}px;
  letter-spacing: ${cssLabLetterSpacing.toFixed(2)}em;
  transform: rotate(${cssLabRotate}deg);
  opacity: ${cssLabOpacity.toFixed(2)};
}`}
            </pre>
          </div>
        </div>
      </aside>
    ) : null}

    <p
      className={styles.playgroundTip}
    >
      TIP: 여기서는 정답보다
      과정이 더 중요할지도.
    </p>
  </section>
</article>
  );
}
