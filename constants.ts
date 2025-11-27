
import { LearningUnit } from './types';

export const UNITS: LearningUnit[] = [
  {
    id: 'intro',
    title: 'Einführung',
    subTitle: 'Zur Sprache & Schrift',
    xp: 20,
    letters: [],
    vocabulary: [
        { arabic: 'كَتَبَ', german: 'er schrieb', transliteration: 'Kataba', note: 'Wurzel K-T-B' },
        { arabic: 'كِتاب', german: 'Buch', transliteration: 'Kitāb', note: 'Wurzel K-T-B' },
        { arabic: 'مَكْتَب', german: 'Büro', transliteration: 'Maktab', note: 'Wurzel K-T-B' },
        { arabic: 'كاتِب', german: 'Schreiber/Autor', transliteration: 'Kātib', note: 'Wurzel K-T-B' },
    ],
    grammar: [
      {
        title: "Infos zu diesen Kurs: nach einem Manuskript von Nagy Malek",
        content: [
            "Ziele: Gebrauch des Alphabets, Grundschatz an Vokabeln, einfachste Grammatik.",
            "Es wird Hocharabisch vermittelt.",
            "Vokalisierung (kurze Vokale) wird im Alltag oft weggelassen, hier aber zum Lernen genutzt."
        ]
      },
      {
        title: "Struktur der Sprache",
        content: [
            "Arabisch gehört zur afroasiatischen Sprachfamilie (wie Hebräisch).",
            "Es ist eine 'wurzelflektierende' Sprache: Die Basis ist meist eine Wurzel aus 3 Konsonanten.",
            "Beispiel K-T-B (Schreiben): Daraus werden Wörter wie Buch (Kitab) oder Büro (Maktab) gebildet."
        ]
      },
      {
        title: "Die Schrift",
        content: [
            "Geschrieben wird von RECHTS nach LINKS.",
            "Es ist eine Kursivschrift: Buchstaben werden miteinander verbunden.",
            "Buchstaben ändern ihre Form je nach Position im Wort (Anfang, Mitte, Ende, Allein).",
            "Es gibt keine Groß- und Kleinschreibung."
        ]
      }
    ]
  },
  {
    id: 'group1',
    title: '1. Gruppe',
    subTitle: 'ا ل ب ي',
    xp: 50,
    letters: [
      { 
        char: 'ا', name: 'Alif', transliteration: 'A / ā', explanation: 'Langer, offener Vokal, meist wie a in Bahn. Oft mit Verfärbung nach "U" oder "E".',
        forms: { isolated: 'ا', final: 'ـا', medial: 'ـا', initial: 'ا' }
      },
      { 
        char: 'ل', name: 'Lam', transliteration: 'L', explanation: 'Stimmhafter Laterallaut, wie L in Liebe.',
        forms: { isolated: 'ل', final: 'ـل', medial: 'ـلـ', initial: 'لـ' }
      },
      { 
        char: 'ب', name: 'Beh', transliteration: 'B', explanation: 'Stimmhaftes B/P. Wird immer weich gesprochen! Das Arabische kennt kein "P"!',
        forms: { isolated: 'ب', final: 'ـب', medial: 'ـبـ', initial: 'بـ' }
      },
      { 
        char: 'ي', name: 'Yeh', transliteration: 'ī, y, i', explanation: 'Stimmhafter langer Vokal (wie ie in Biene) oder J (wie in Ja).',
        forms: { isolated: 'ي', final: 'ـي', medial: 'ـيـ', initial: 'يـ' }
      },
    ],
    vocabulary: [
      { arabic: 'أَب', german: 'Vater', transliteration: '´Ab' },
      { arabic: 'باب', german: 'Tür', transliteration: 'Ba:b' },
      { arabic: 'ال', german: 'der, die, das', transliteration: 'Äl, `Al, ´El' },
      { arabic: 'لَيْلى', german: 'Laila (Eigenname)', transliteration: 'Laīla' },
      { arabic: 'لا', german: 'nein', transliteration: 'Lā' },
      { arabic: 'الباب', german: 'die Tür', transliteration: 'Al-bāb' },
      { arabic: 'الأَب', german: 'der Vater', transliteration: 'Al-`ab' },
      { arabic: 'بُلْبُل', german: 'Nachtigall', transliteration: 'Bulbul' },
    ],
    grammar: [
      {
        title: 'Besonderheiten',
        content: [
          'Der Buchstabe Beh (ب) wird immer weich gesprochen (auch am Wortende). Das Arabische kennt kein "P"!',
          'Der bestimmte Artikel "al" wird immer mit dem Substantiv nach links verbunden.',
          'Die Kombination "lam-alif" hat ein besonderes Zeichen: لا'
        ]
      }
    ]
  },
  {
    id: 'vowels',
    title: '2.1 Die Vokale',
    subTitle: 'Tashkeel (Vokalisationszeichen)',
    xp: 40,
    letters: [],
    vocabulary: [
      { arabic: 'بَ', german: 'ba (Kurzes a)', transliteration: 'ba', note: 'Fat7a (Strich oben)' },
      { arabic: 'بِ', german: 'bi (Kurzes i)', transliteration: 'bi', note: 'Kaßra (Strich unten)' },
      { arabic: 'بُ', german: 'bu (Kurzes u)', transliteration: 'bu', note: 'Damma (Kringel oben)' },
      { arabic: 'بْ', german: 'b (Vokallos)', transliteration: 'b', note: 'Sukun (Kreis)' },
      { arabic: 'بّ', german: 'bb (Verdopplung)', transliteration: 'bb', note: 'Schadda' },
      { arabic: 'أَ', german: 'a', transliteration: '[a]', note: 'Beispiel' },
      { arabic: 'إِ', german: 'i', transliteration: '[i]', note: 'Beispiel' },
      { arabic: 'أُ', german: 'u', transliteration: '[u]', note: 'Beispiel' },
      { arabic: 'بَ', german: 'ba', transliteration: '[ba]', note: 'Beispiel' },
      { arabic: 'بِ', german: 'bi', transliteration: '[bi]', note: 'Beispiel' },
      { arabic: 'بُ', german: 'bu', transliteration: '[bu]', note: 'Beispiel' },
      { arabic: 'تَ', german: 'ta', transliteration: '[ta]', note: 'Beispiel' },
      { arabic: 'تِ', german: 'ti', transliteration: '[ti]', note: 'Beispiel' },
      { arabic: 'تُ', german: 'tu', transliteration: '[tu]', note: 'Beispiel' },
      { arabic: 'نَ', german: 'na', transliteration: '[na]', note: 'Beispiel' },
      { arabic: 'نِ', german: 'ni', transliteration: '[ni]', note: 'Beispiel' },
      { arabic: 'نُ', german: 'nu', transliteration: '[nu]', note: 'Beispiel' },
      { arabic: 'مَرْحَباً اِسْمي سَميرة', german: 'Hallo, mein Name ist Samira', transliteration: 'Mar7aba, išmi Samira' },
      { arabic: 'مَرْحَباً سَميرة، اِسْمي نَبيل', german: 'Hallo Samira, mein Name ist Nabil', transliteration: 'Mar7aba Samira, išmi Nabil' },
    ],
    grammar: [
      {
        title: 'Kurzvokale & Zeichen',
        content: [
          'Das Arabische ist eine Konsonantenschrift.',
          'Kurze Vokale (a, i, u) werden meist nicht geschrieben, sondern als kleine Zeichen über/unter die Buchstaben gesetzt.',
          'Fat7a (Strich oben): kurzes a',
          'Kaßra (Strich unten): kurzes i/e',
          'Damma (Kringel oben): kurzes u/o',
          'Sukun (Kreis): Vokallosigkeit',
          'Tanwien (doppeltes Zeichen): Endung -an, -in, -un'
        ]
      },
      {
        title: 'Sprachübung (Dialog)',
        content: [
          'Auf Seite 6 stellen sich zwei Kinder vor.',
          'Mädchen: "Mar7aba, išmi Samira" (Hallo, ich heiße Samira).',
          'Junge: "Mar7aba Samira, išmi Nabil" (Hallo Samira, ich heiße Nabil).',
          'Übung: Ersetzen Sie die Namen durch Ihren eigenen Namen und den Ihres Gesprächspartners.'
        ]
      }
    ]
  },
  {
    id: 'group2',
    title: '2. Gruppe',
    subTitle: 'ت ث ن',
    xp: 50,
    letters: [
      { 
        char: 'ت', name: 'Teh', transliteration: 'T', explanation: 'Stimmloses T, wie in Tasse.',
        forms: { isolated: 'ت', final: 'ـت', medial: 'ـتـ', initial: 'تـ' }
      },
      { 
        char: 'ث', name: 'Theh (Θeh)', transliteration: 'Θ / th', explanation: 'Stimmlos wie englisches "th" in "thing". Lispeln (bei Zischlaut S)!',
        forms: { isolated: 'ث', final: 'ـث', medial: 'ـثـ', initial: 'ثـ' }
      },
      { 
        char: 'ن', name: 'Nun', transliteration: 'N', explanation: 'Stimmhafter Nasallaut, wie N in Nase.',
        forms: { isolated: 'ن', final: 'ـن', medial: 'ـنـ', initial: 'نـ' }
      },
    ],
    vocabulary: [
      { arabic: 'ثابِت', german: 'Thabit (Eigenname)', transliteration: 'Θābit', note: 'der Standhafte' },
      { arabic: 'أَنا', german: 'ich', transliteration: '`Anā' },
      { arabic: 'أَنْتَ', german: 'du (m)', transliteration: '`Anta' },
      { arabic: 'أَنْتِ', german: 'du (f)', transliteration: '`Anti' },
      { arabic: 'بُن', german: 'Kaffeebohnen', transliteration: 'Bun' },
      { arabic: 'بِنْت', german: 'Mädchen / Tochter', transliteration: 'Bint' },
      { arabic: 'بَنات', german: 'Mädchen / Töchter (Pl.)', transliteration: 'Banāt' },
      { arabic: 'يا', german: 'oh, ach (Anredepartikel)', transliteration: 'Yā' },
      { arabic: 'لَبّان', german: 'Milchmann', transliteration: 'Labān' },
      { arabic: 'لَبَن', german: 'Milch', transliteration: 'Laban' },
      { arabic: 'نَبات', german: 'Pflanze(n)', transliteration: 'Nabāt' },
      { arabic: 'نَبيل', german: 'Nabil (Eigenname)', transliteration: 'Nabīl', note: 'der Edle' },
      { arabic: 'بُني', german: 'braun', transliteration: 'Bunī' },
      { arabic: 'بَيْت', german: 'Haus', transliteration: 'Baīt' },
      { arabic: 'أَثاث', german: 'Hausfundament/-einrichtung', transliteration: '`Aθāθ' },
      { arabic: 'تين', german: 'Feigen', transliteration: 'Tīn' },
      { arabic: 'أَنا إِبْن اللَبّان', german: 'Ich bin der Sohn des Milchmanns', transliteration: 'Ana Ibn al-labān' },
      { arabic: 'أَنا بِنْت اللَبّان', german: 'Ich bin die Tochter des Milchmanns', transliteration: 'Ana Bint al-labān' },
      { arabic: 'البُن بُني', german: 'Die Kaffeebohnen sind braun', transliteration: 'Al-bun bunī' },
      { arabic: 'باب البَيْت بُني', german: 'Die Haustür ist braun', transliteration: 'Bab al-bait bunī' },
    ],
    grammar: [
      {
        title: 'Regeln',
        content: [
          'Präpositionen wie "bi" (in, an) werden immer mit dem Substantiv verbunden.',
          'Es gibt keinen unbestimmten Artikel (ein/eine) im Arabischen.'
        ]
      }
    ]
  },
  {
    id: 'hamza',
    title: '2.2 Das Hamza',
    subTitle: 'ء',
    xp: 30,
    letters: [
      { 
        char: 'ء', name: 'Hamza', transliteration: '\'', explanation: 'Stimmabsatz (Knacklaut), wie in "be-achten" oder "Spiegelei".',
        forms: { isolated: 'ء', final: 'ـئ', medial: 'ـؤ', initial: 'أ' }
      }
    ],
    vocabulary: [
      { arabic: 'أَنا', german: 'Ich', transliteration: '`Anā' },
      { arabic: 'إِبْن', german: 'Sohn', transliteration: '`Ibn' },
      { arabic: 'أُم', german: 'Mutter', transliteration: '`Umm' },
    ],
    grammar: [
      {
        title: 'Regeln',
        content: [
          'Das Hamza ist kein eigener Buchstabe, sondern ein Zeichen für den Stimmabsatz.',
          'Am Wortanfang sitzt es meist auf einem Alif (أ oder إ).',
          'Es sorgt dafür, dass im Arabischen jede Silbe mit einem Konsonanten beginnt (auch wenn es wie Vokal klingt).'
        ]
      }
    ]
  },
  {
    id: 'group3',
    title: '3. Gruppe',
    subTitle: 'س ش',
    xp: 50,
    letters: [
      { 
        char: 'س', name: 'Sin', transliteration: 'S / ß', explanation: 'Scharfes S wie in "Riß" oder "Rast".',
        forms: { isolated: 'س', final: 'ـس', medial: 'ـسـ', initial: 'سـ' }
      },
      { 
        char: 'ش', name: 'Schin', transliteration: 'Sch', explanation: 'Wie deutsches SCH in "Schule" oder "Schade".',
        forms: { isolated: 'ش', final: 'ـش', medial: 'ـشـ', initial: 'شـ' }
      },
    ],
    vocabulary: [
      { arabic: 'ناس', german: 'Menschen', transliteration: 'Nāß' },
      { arabic: 'إِنْسان', german: 'Mensch', transliteration: '`Inßān' },
      { arabic: 'شِبْشِب', german: 'Hausschuhe', transliteration: 'Schibschib' },
      { arabic: 'بُسْتان', german: 'Garten', transliteration: 'Bußtān' },
      { arabic: 'سَبَب', german: 'Ursache / Grund', transliteration: 'ßabab' },
      { arabic: 'لَيْسَ', german: 'nicht sein', transliteration: 'laīßa' },
      { arabic: 'أَنا إِنْسان', german: 'Ich bin ein Mensch', transliteration: '`Anā `Inßān' },
      { arabic: 'أَنْتَ السَبَب', german: 'Du bist schuld', transliteration: '´Anta {al}ßabab' },
      { arabic: 'شِبْشِب البِنْت بُني', german: 'Die Hausschuhe des Mädchens sind braun', transliteration: 'Schibschib al-bint bunī' },
      { arabic: 'نَبيل بِالبَيْت', german: 'Nabil ist in dem Haus', transliteration: 'Nabīl bil-baīt' },
      { arabic: 'البَيْت ثابِت', german: 'Das Haus ist stabil', transliteration: '`Al-baīt θābit' },
      { arabic: 'البَيْت البُني ثابِت', german: 'Das braune Haus ist stabil', transliteration: '`Al-baīt al-bunī θābit' },
      { arabic: 'الشّاي نَبات', german: 'Der Tee ist eine Pflanze', transliteration: 'A{L}sch-schāī Nabāt' },
      { arabic: 'باب البَيْت بُني', german: 'Die Tür des Hauses ist braun', transliteration: 'Bāb al-baīt Bunī' },
      { arabic: 'الباب البُني', german: 'Die braune Tür', transliteration: '`Al-bāb Al-bunī' },
    ],
    grammar: [
      {
        title: 'Grammatik-Regeln (Seite 9)',
        content: [
          '"Sein" wird in der Gegenwart weder geschrieben noch gesprochen.',
          'Es gibt nur 2 Geschlechter: Maskulinum und Femininum.',
          'Präpositionen wie "bi" (in/an) werden direkt mit dem Substantiv verbunden (z.B. Bil-bait).',
          'Es gibt einen bestimmten Artikel (al), aber KEINEN unbestimmten Artikel.'
        ]
      }
    ]
  },
  {
    id: 'group4',
    title: '4. Gruppe',
    subTitle: 'د ذ ر ز و',
    xp: 60,
    letters: [
      { char: 'و', name: 'Waw', transliteration: 'Ẅ / w / u', explanation: 'Wie englisches W in word, with, water.', forms: { isolated: 'و', final: 'ـو', medial: 'ـو', initial: 'و' } },
      { char: 'ر', name: 'Reh', transliteration: 'R', explanation: 'R, aber gerollt wie im bayerischen Dialekt!', forms: { isolated: 'ر', final: 'ـر', medial: 'ـر', initial: 'ر' } },
      { char: 'ز', name: 'Zain', transliteration: 'Ş / Z', explanation: 'Stimmhaftes S wie in "Suchen", "Rosine".', forms: { isolated: 'ز', final: 'ـز', medial: 'ـز', initial: 'ز' } },
      { char: 'د', name: 'Dal', transliteration: 'D', explanation: 'Stimmhafter Verschlusslaut, wie D in "Dach".', forms: { isolated: 'د', final: 'ـد', medial: 'ـد', initial: 'د' } },
      { char: 'ذ', name: 'Dhal (Thäl)', transliteration: 'th / dh', explanation: 'Stimmhaftes TH wie in "the", "father".', forms: { isolated: 'ذ', final: 'ـذ', medial: 'ـذ', initial: 'ذ' } },
    ],
    vocabulary: [
      { arabic: 'وَ', german: 'und', transliteration: 'Ẅa' },
      { arabic: 'أَرْنَب', german: 'Hase', transliteration: '`Arnab' },
      { arabic: 'نار', german: 'Feuer', transliteration: 'Nār' },
      { arabic: 'زَبيب', german: 'Rosinen', transliteration: 'Şabīb' },
      { arabic: 'زِر', german: 'Knopf / Taste', transliteration: 'Şir' },
      { arabic: 'سِر', german: 'geheim', transliteration: 'ßir' },
      { arabic: 'دَرْس', german: 'Unterricht / Lektion', transliteration: 'Darß' },
      { arabic: 'ذَيْل', german: 'Schwanz / Anhang', transliteration: 'Thaīl' },
      { arabic: 'إِذْن', german: 'Erlaubnis', transliteration: '`Ithn' },
      { arabic: 'أُذُن', german: 'Ohr', transliteration: '´Othun' },
      { arabic: 'لَذيذ', german: 'lecker', transliteration: 'Lathīth' },
      { arabic: 'بارِد', german: 'kalt', transliteration: 'Bārid' },
      { arabic: 'شَراب', german: 'Getränk', transliteration: 'Scharāb' },
      { arabic: 'شَرَبَ', german: 'trinken', transliteration: 'Scharaba' },
      { arabic: 'دُب', german: 'Bär', transliteration: 'Dub' },
      { arabic: 'نَبيذ', german: 'Wein', transliteration: 'Nabīth' },
      { arabic: 'وَرْد', german: 'Rosen', transliteration: 'Ẅard' },
      { arabic: 'يُريد', german: 'möchte / verlangt (er)', transliteration: 'Yurīd' },
      { arabic: 'تُريد', german: 'möchte / verlangt (sie)', transliteration: 'Turīd' },
    ]
  },
  {
    id: 'group5',
    title: '5. Gruppe',
    subTitle: 'م ه ة',
    xp: 50,
    letters: [
      { char: 'م', name: 'Mim', transliteration: 'M', explanation: 'Wie M in Mann.', forms: { isolated: 'م', final: 'ـم', medial: 'ـمـ', initial: 'مـ' } },
      { char: 'ه', name: 'Ha', transliteration: 'H', explanation: 'Hauchlaut wie H in Hund.', forms: { isolated: 'ه', final: 'ـه', medial: 'ـهـ', initial: 'هـ' } },
      { char: 'ة', name: 'Ta Marbuta', transliteration: 'a / at', explanation: 'Femininendung. Meist stumm (a), im Genitiv t.', forms: { isolated: 'ة', final: 'ـة', medial: '', initial: '' } },
    ],
    vocabulary: [
      { arabic: 'شَمْس', german: 'Sonne', transliteration: 'Schamß' },
      { arabic: 'سَلام', german: 'Frieden', transliteration: 'ßalām' },
      { arabic: 'سِمْسِم', german: 'Sesam', transliteration: 'ßimßim' },
      { arabic: 'ماما', german: 'Mutter', transliteration: 'Māmā' },
      { arabic: 'تَمْر', german: 'Datteln', transliteration: 'Tamr' },
      { arabic: 'ثَمار', german: 'Frucht', transliteration: 'Θamār' },
      { arabic: 'سَمْن', german: 'Fett (Butterschmalz)', transliteration: 'ßamn' },
      { arabic: 'مِشْمِش', german: 'Aprikosen', transliteration: 'Mischmisch' },
      { arabic: 'مَوْز', german: 'Banane', transliteration: 'Mauoş' },
      { arabic: 'المُرور', german: 'der Strassenverkehr', transliteration: '`Al-muruor' },
      { arabic: 'هَذا', german: 'dieser', transliteration: 'Hathā' },
      { arabic: 'هَدِيَّة', german: 'Geschenk', transliteration: 'hadīa' },
      { arabic: 'سَهْل', german: 'leicht', transliteration: 'ßahl' },
      { arabic: 'إِسْهال', german: 'Durchfall', transliteration: '`Ißhāl' },
      { arabic: 'لَهُ', german: 'für ihn', transliteration: 'Lahu' },
      { arabic: 'ثَوْر', german: 'Stier', transliteration: 'Θaẅr' },
      { arabic: 'ثَوْرة', german: 'Revolution', transliteration: 'Θaẅra' },
      { arabic: 'بَدْلة', german: 'Anzug', transliteration: 'Badla' },
      { arabic: 'بيرة', german: 'Bier', transliteration: 'Bīra' },
      { arabic: 'نِهايَة', german: 'Ende', transliteration: 'Nihāīa' },
      { arabic: 'لَيْلى و ثابِت ناس', german: 'Laila und Thabit sind Menschen', transliteration: 'Laīla ẅa θābit Nāß' },
      { arabic: 'أَنا و أَنْتَ', german: 'Ich und du', transliteration: '`Anā ẅa `Anta' },
      { arabic: 'أَنا مِنْ مِصْر', german: 'Ich bin aus Ägypten', transliteration: 'Ana min Misr' },
      { arabic: 'أَنا مِنْ هانوفر', german: 'Ich bin aus Hannover', transliteration: 'Ana min Hannover' },
    ],
    grammar: [
        {
            title: "Die Femininendung",
            content: [
                "Die Endung ة (Ta Marbuta) macht Wörter weiblich.",
                "Beispiel: Ibn (Sohn) -> Ibna (Tochter) (geschrieben mit ة).",
                "Im Genitiv wird es 'at' gesprochen (z.B. Ibnat Nabil).",
                "Wichtige Ausnahme: Bei Farben gilt ein anderes Schema."
            ]
        }
    ]
  },
  {
    id: 'questions',
    title: 'Fragen & Dialoge',
    subTitle: 'Sätze bilden',
    xp: 40,
    letters: [],
    vocabulary: [
        { arabic: 'أَيْنَ', german: 'wo', transliteration: '`Aina' },
        { arabic: 'مَنْ', german: 'wer', transliteration: 'Man' },
        { arabic: 'مِنْ', german: 'von', transliteration: 'Min' },
        { arabic: 'ماذا', german: 'was', transliteration: 'Māthā' },
        { arabic: 'هَل', german: 'Fragepartikel (ob)', transliteration: 'Hal' },
        { arabic: 'مَنْ أَنْتَ؟', german: 'Wer bist du? (m)', transliteration: 'Man anta?' },
        { arabic: 'مِنْ أَيْنَ أَنْتَ؟', german: 'Von wo bist du? (m)', transliteration: 'Min aina anta?' },
        { arabic: 'هَل الدَّرْس سَهْل؟', german: 'Ist der Unterricht leicht?', transliteration: 'Hal Ad-darß ßahl?' },
        { arabic: 'أَنا مِن لُبْنان', german: 'Ich bin aus Libanon.', transliteration: '`Anā Min Lubnān' },
    ],
    grammar: [
        {
            title: "Der Fragesatz mit 'Hal'",
            content: [
                "Fragen, die mit Ja/Nein beantwortet werden, beginnen mit 'Hal'.",
                "Fragesatz = 'Hal' + Aussagesatz + '?'",
                "Beispiel: Hal Ad-darß ßahl? (Ist der Unterricht leicht?)"
            ]
        },
        {
            title: "Dialog-Übung (Seite 15)",
            content: [
                "Person A: Salam, Man Anta? (Hallo, wer bist du?)",
                "Person B: Salam, Ana Samir. Wa Anta? (Hallo, ich bin Samir. Und du?)",
                "Person A: Ahlan wa sahlan ya Samir. Ana Nadia. Min aina anta? (Willkommen Samir. Ich bin Nadia. Woher kommst du?)",
                "Person B: Ana min Berlin. (Ich bin aus Berlin.)"
            ]
        }
    ]
  },
  {
    id: 'story_intro',
    title: 'Mini-Story: Kennenlernen',
    subTitle: 'Nabil & Samira',
    xp: 100,
    letters: [],
    vocabulary: [],
    story: {
        id: 'intro_conversation',
        title: 'Erstes Treffen',
        messages: [
            { 
                id: '1', 
                sender: 'Nabil', 
                text: 'السَّلامُ عَلَيْكُم', 
                audioText: 'As-salamu alaykum',
                translation: 'Friede sei mit euch' 
            },
            {
                id: '2',
                sender: 'User',
                text: '...',
                choices: [
                    { text: 'وَعَلَيْكُم السَّلام', isCorrect: true, response: 'Wa alaykum as-salam' },
                    { text: 'مَرْحَباً', isCorrect: false, response: 'Marhaban (Auch okay, aber nicht die klassische Antwort)' }
                ]
            },
            {
                id: '3',
                sender: 'Samira',
                text: 'أَنا سَميرة. مَنْ أَنْتَ؟',
                audioText: 'Ana Samira. Man anta?',
                translation: 'Ich bin Samira. Wer bist du?'
            },
            {
                id: '4',
                sender: 'User',
                text: '...',
                choices: [
                    { text: 'أَنا نَبيل.', isCorrect: true, response: 'Ich bin Nabil.' },
                    { text: 'أَنْتَ نَبيل.', isCorrect: false, response: 'Du bist Nabil (Falsche Person)' }
                ]
            },
            {
                id: '5',
                sender: 'Samira',
                text: 'أَهْلاً يا نَبيل.',
                audioText: 'Ahlan ya Nabil',
                translation: 'Willkommen, Nabil.'
            }
        ]
    }
  },
  {
    id: 'group6',
    title: '6. Gruppe',
    subTitle: 'ض ص ظ ط',
    xp: 60,
    letters: [
        { char: 'ط', name: 'Ťah', transliteration: 'Ť', explanation: 'Emphatisches stimmloses dumpfes T wie Trompete.', forms: { isolated: 'ط', final: 'ـط', medial: 'ـطـ', initial: 'طـ' } },
        { char: 'ظ', name: 'Žah', transliteration: 'Ž', explanation: 'Emphatisches stimmhaftes Z (englisches "th" in "that").', forms: { isolated: 'ظ', final: 'ـظ', medial: 'ـظـ', initial: 'ظـ' } },
        { char: 'ص', name: 'Šad', transliteration: 'Š', explanation: 'Emphatisches stimmloses dumpfes S (wie in "Sonne").', forms: { isolated: 'ص', final: 'ـص', medial: 'ـصـ', initial: 'صـ' } },
        { char: 'ض', name: 'Đad', transliteration: 'Đ', explanation: 'Emphatisches stimmhaftes D.', forms: { isolated: 'ض', final: 'ـض', medial: 'ـضـ', initial: 'ضـ' } },
    ],
    vocabulary: [
        { arabic: 'طالِب', german: 'Schüler/Student', transliteration: 'Ťālib' },
        { arabic: 'طَبيب', german: 'Arzt', transliteration: 'Ťabīb' },
        { arabic: 'طين', german: 'Schlamm', transliteration: 'Ťīn' },
        { arabic: 'ظِل', german: 'Schatten', transliteration: 'Žil' },
        { arabic: 'ظَلام', german: 'Dunkelheit', transliteration: 'Žalām' },
        { arabic: 'ظالِم', german: 'Tyrann', transliteration: 'Žālim' },
        { arabic: 'ظُلْم', german: 'Diskriminierung', transliteration: 'Žulm' },
        { arabic: 'ظَبي', german: 'Gazelle/Reh', transliteration: 'Žabī' },
        { arabic: 'صَبي', german: 'Junge', transliteration: 'Šabī' },
        { arabic: 'صُرْصَر', german: 'Kakerlake', transliteration: 'ŠurŠar' },
        { arabic: 'صَبْر', german: 'Geduld', transliteration: 'Šabr' },
        { arabic: 'مِصْر', german: 'Ägypten', transliteration: 'MiŠr' },
        { arabic: 'ضابِط', german: 'Offizier', transliteration: 'ĐābiŤ' },
        { arabic: 'أَبْيَض', german: 'weiß', transliteration: 'Abīađ' },
        { arabic: 'بَيْض', german: 'Eier', transliteration: 'Baīđ' },
    ]
  },
  {
    id: 'group7',
    title: '7. Gruppe',
    subTitle: 'ق ف',
    xp: 50,
    letters: [
        { char: 'ف', name: 'Feh', transliteration: 'F', explanation: 'Stimmloser Reibelaut, wie F in Faul.', forms: { isolated: 'ف', final: 'ـف', medial: 'ـفـ', initial: 'فـ' } },
        { char: 'ق', name: 'Ķaf', transliteration: 'Ķ', explanation: 'Emphatisches stimmloses Q (Kehllaut).', forms: { isolated: 'ق', final: 'ـق', medial: 'ـقـ', initial: 'قـ' } },
    ],
    vocabulary: [
        { arabic: 'فِلْفِل', german: 'Paprika, Pfeffer', transliteration: 'Filfil' },
        { arabic: 'فَلافِل', german: 'Falafel', transliteration: 'Falāfel' },
        { arabic: 'قَلَم', german: 'Stift', transliteration: 'Ķalam' },
        { arabic: 'بَطاطا', german: 'Kartoffeln', transliteration: 'Batata' },
        { arabic: 'وَظيفَة', german: 'Beschäftigung (Beruf)', transliteration: 'Ẅažīfa' },
        { arabic: 'صُنْدوق', german: 'Box', transliteration: 'Šundouķ' },
        { arabic: 'فَقَط', german: 'nur', transliteration: 'Faķať' },
        { arabic: 'قَذِر', german: 'dreckig', transliteration: 'Ķathir' },
        { arabic: 'فُسْتان', german: 'Kleid', transliteration: 'Fußtān' },
        { arabic: 'في', german: 'in', transliteration: 'Fī' },
        { arabic: 'طَريق', german: 'Weg, Straße', transliteration: 'Ťarīķ' },
        { arabic: 'طُرُق', german: 'Wege, Straßen', transliteration: 'Ťuruķ' },
        { arabic: 'بَقَرة', german: 'Kuh', transliteration: 'Baķara' },
        { arabic: 'طَبَق الأَرُز', german: 'Reisteller', transliteration: 'Ťabaķ-ar-ruş' },
        { arabic: 'بُرْتُقال', german: 'Orangen', transliteration: 'Burtuķāl' },
        { arabic: 'قَلْب', german: 'Herz', transliteration: 'Ķalb' },
        { arabic: 'قِف', german: 'Stop', transliteration: 'Ķif' },
        { arabic: 'مَوْقِف', german: 'Haltestelle', transliteration: 'Maẅķaf' },
        { arabic: 'قَليل', german: 'wenig', transliteration: 'Ķali:l' },
        // Farben aus Seite 18
        { arabic: 'أَسْوَد', german: 'schwarz (m)', transliteration: 'Aßẅad' },
        { arabic: 'سَوْداء', german: 'schwarz (f)', transliteration: 'ßaẅda:\'' },
        { arabic: 'أَزْرَق', german: 'blau (m)', transliteration: 'Asraķ' },
        { arabic: 'زَرْقاء', german: 'blau (f)', transliteration: 'Şarķa:\'' },
        { arabic: 'أَبْيَض', german: 'weiß (m)', transliteration: 'Abīađ' },
        { arabic: 'بَيْضاء', german: 'weiß (f)', transliteration: 'Baīđa:\'' },
        // Satz
        { arabic: 'فُسْتان الطّالِبة أَسْوَد', german: 'Das Kleid der Studentin ist schwarz', transliteration: 'Fußtān-ať-ťāliba `Aßẅad' },
    ],
    grammar: [
        {
            title: "Wortwurzeln bei Farben",
            content: [
                "Die weibliche Form der Worte für Farben wird nicht mit der Feminin-Endung erzeugt, sondern nach einem anderen Schema.",
                "Schema Maskulin: A - ß - w - a - d (Aßẅad - schwarz)",
                "Schema Feminin: ß - a - ẅ - d - a:' (ßaẅda:' - schwarz)",
                "Beispiel: Asraķ (blau m.) -> Šarķa:' (blau f.)"
            ]
        }
    ]
  },
  {
    id: 'group8',
    title: '8. Gruppe',
    subTitle: 'غ ع ك',
    xp: 50,
    letters: [
        { char: 'ك', name: 'Kaf', transliteration: 'K', explanation: 'Stimmloser Verschlusslaut, wie K in Kasse.', forms: { isolated: 'ك', final: 'ـك', medial: 'ـكـ', initial: 'كـ' } },
        { char: 'ع', name: 'Æin', transliteration: 'Æ', explanation: 'Gepreßter Kehllaut (keine dt. Entsprechung).', forms: { isolated: 'ع', final: 'ـع', medial: 'ـعـ', initial: 'عـ' } },
        { char: 'غ', name: 'Řen', transliteration: 'Ř', explanation: 'R wie im Französischen (Zäpfchen-R).', forms: { isolated: 'غ', final: 'ـغ', medial: 'ـغـ', initial: 'غـ' } },
    ],
    vocabulary: [
        { arabic: 'كَف', german: 'Hand', transliteration: 'Kaf' },
        { arabic: 'كَفيف', german: 'blind', transliteration: 'Kafīf' },
        { arabic: 'كَفى', german: 'Stop, es reicht', transliteration: 'Kafa' },
        { arabic: 'عَيْن', german: 'Auge', transliteration: 'Æaīn' },
        { arabic: 'كَلْب', german: 'Hund', transliteration: 'Kalb' },
        { arabic: 'عَسَل', german: 'Honig/Sirup', transliteration: 'Æaßal' },
        { arabic: 'كَباب', german: 'Kebab', transliteration: 'Kabāb' },
        { arabic: 'كِتاب', german: 'Buch', transliteration: 'Kitāb' },
        { arabic: 'مَكْتَب', german: 'Büro/Schreibtisch', transliteration: 'Maktab' },
        { arabic: 'شَوْكي', german: 'stachelig', transliteration: 'Schaẅkī' },
        { arabic: 'غالي', german: 'teuer', transliteration: 'Řālī' },
        { arabic: 'مَلِك', german: 'König', transliteration: 'Malek' },
        { arabic: 'عَلي', german: 'Ali (Name)', transliteration: 'Ælī' },
        { arabic: 'بَعير', german: 'Kamelbulle', transliteration: 'Baæīr' },
        { arabic: 'عَلى', german: 'auf', transliteration: 'Æla' },
        { arabic: 'عِنَب', german: 'Traube', transliteration: 'æinab' },
        { arabic: 'عَبْد الْمَلِك', german: 'Diener des Königs', transliteration: 'Æabd-el-malek' },
        { arabic: 'صَعْب', german: 'schwer', transliteration: 'šaæb' },
        { arabic: 'غَريب', german: 'Fremder', transliteration: 'Řarīb' },
        { arabic: 'غَبي', german: 'dumm', transliteration: 'Řabī' },
    ]
  },
  {
    id: 'group9',
    title: '9. Gruppe',
    subTitle: 'خ ح ج',
    xp: 60,
    letters: [
        { char: 'ج', name: 'Ĝeem', transliteration: 'Ĝ', explanation: 'G, wie englisches G in "Gentleman" oder "Jungle".', forms: { isolated: 'ج', final: 'ـج', medial: 'ـجـ', initial: 'جـ' } },
        { char: 'ح', name: 'Ĥah', transliteration: 'Ĥ', explanation: 'Kräftig gehauchtes H (keine dt. Entsprechung).', forms: { isolated: 'ح', final: 'ـح', medial: 'ـحـ', initial: 'حـ' } },
        { char: 'خ', name: 'Ķhah', transliteration: 'Ķh', explanation: 'CH wie in "Tuch" oder "Bach".', forms: { isolated: 'خ', final: 'ـخ', medial: 'ـخـ', initial: 'خـ' } },
    ],
    vocabulary: [
        { arabic: 'ناجي', german: 'Nagi (Eigenname)', transliteration: 'Nāĝī' },
        { arabic: 'رَجُل', german: 'Mann', transliteration: 'Raĝul' },
        { arabic: 'رِجْل', german: 'Fuß', transliteration: 'Riĝl' },
        { arabic: 'مِلْح', german: 'Salz', transliteration: 'Milĥ' },
        { arabic: 'جَمَل', german: 'Kamel', transliteration: 'Ĝamal' },
        { arabic: 'جَمال', german: 'Schönheit', transliteration: 'Ĝamāl' },
        { arabic: 'سَحاب', german: 'Wolke', transliteration: 'ßaĥāb' },
        { arabic: 'جامِع', german: 'Moschee', transliteration: 'Ĝāmiæ' },
        { arabic: 'جامِعة', german: 'Universität', transliteration: 'Ĝāmiæa' },
        { arabic: 'حَلال', german: 'erlaubt', transliteration: 'Ĥalāl' },
        { arabic: 'حَرام', german: 'verboten', transliteration: 'Ĥarām' },
        { arabic: 'خَوْخ', german: 'Pfirsich', transliteration: 'Ķhẅķh' },
        { arabic: 'حِلْو', german: 'süß', transliteration: 'Ĥilẅ' },
        { arabic: 'حَلْوى', german: 'Süßigkeit', transliteration: 'Ĥalẅā' },
        { arabic: 'مُلوخِية', german: 'ägyptische Suppe', transliteration: 'Mulẅķhīa' },
        { arabic: 'حَمّام', german: 'Bad', transliteration: 'Ĥamām' },
        { arabic: 'حَمّامات', german: 'Bäder', transliteration: 'Ĥamāmāt' },
        { arabic: 'جَميل', german: 'schön', transliteration: 'Ĝamīl' },
        { arabic: 'صَباح', german: 'Morgen', transliteration: 'Šabāĥ' },
        { arabic: 'نَخْل', german: 'Palmen', transliteration: 'Naķhl' },
        { arabic: 'لَحْم', german: 'Fleisch', transliteration: 'Laĥm' },
        { arabic: 'بَيْت لَحْم', german: 'Bethlehem', transliteration: 'Baīt laĥm' },
        { arabic: 'حُمار', german: 'Esel', transliteration: 'Ĥumār' },
        { arabic: 'حَبيب', german: 'Liebling', transliteration: 'Ĥabīb' },
        { arabic: 'حار', german: 'scharf/heiß', transliteration: 'Ĥār' },
        { arabic: 'بَلَح', german: 'Datteln', transliteration: 'Balaĥ' },
        { arabic: 'حَشيش', german: 'Gras/Haschisch', transliteration: 'Ĥaschīsch' },
        { arabic: 'خَليل', german: 'Busenfreund', transliteration: 'Ķhalīl' },
        { arabic: 'دُخان', german: 'Tabak', transliteration: 'Duķhān' },
        { arabic: 'خُبْز', german: 'Brot', transliteration: 'Ķhubş' },
        { arabic: 'خَبّاز', german: 'Bäcker', transliteration: 'Ķhabāş' },
    ]
  },
  {
    id: 'greetings',
    title: 'Grüße & Wünsche',
    subTitle: 'Seite 23-24',
    xp: 40,
    letters: [],
    vocabulary: [
        { arabic: 'كِتابي', german: 'mein Buch', transliteration: 'Kitabī' },
        { arabic: 'قَلْبُك', german: 'dein Herz (m)', transliteration: 'Ķalbuka' },
        { arabic: 'قَلْبُكِ', german: 'dein Herz (f)', transliteration: 'Ķalbuki' },
        { arabic: 'حَبيبة', german: 'Liebling (f)', transliteration: 'Ĥabība' },
        { arabic: 'حَبيبَتي', german: 'meine Liebste', transliteration: 'ĤabībaTī' },
        { arabic: 'صَباح', german: 'Morgen', transliteration: 'Šabāĥ' },
        { arabic: 'مَساء', german: 'Abend', transliteration: 'Maßā\'' },
        { arabic: 'نَهار', german: 'Tag', transliteration: 'Nahār' },
        { arabic: 'عيد', german: 'Fest', transliteration: 'Æīd' },
        { arabic: 'ميلاد', german: 'Geburt', transliteration: 'Milād' },
        { arabic: 'سَلامٌ عَلَيْكُم', german: 'Frieden sei mit euch', transliteration: 'ßalāmun ælaīkum' },
        { arabic: 'صَباحُ الخَيْر', german: 'Guten Morgen', transliteration: 'Šabāĥ-ul-ķhair' },
        { arabic: 'صَباحُ النُّور', german: 'Antwort auf Guten Morgen', transliteration: 'Šabīĥu-n-nẅr' },
        { arabic: 'مَساءُ الخَيْر', german: 'Guten Abend', transliteration: 'maßā\'u-l-ķhaīr' },
        { arabic: 'نَهارُكَ سَعيد', german: 'Dein Tag sei glücklich (m)', transliteration: 'Nihāruka ßaæīd' },
        { arabic: 'عيد سَعيد', german: 'Glückliches Fest', transliteration: 'Æīd ßaæīd' },
        { arabic: 'عيد ميلاد سَعيد', german: 'Glückliche Weihnacht (Geburt)', transliteration: 'Æīd Mīlād ßaæīd' },
    ],
    grammar: [
        {
            title: "Possessivpronomen (Mein/Dein)",
            content: [
                "Werden als Suffix angehängt:",
                "-i = mein (Kitabi = mein Buch)",
                "-uka = dein (m) (Kalbuka)",
                "-uki = dein (f) (Kalbuki)",
                "Wenn eine Femininendung ة dazwischen steht, wird sie zu 't' (Habiba -> Habibati)."
            ]
        }
    ]
  },
  {
    id: 'sunmoon',
    title: 'Sonnen- & Mondbuchstaben',
    subTitle: 'Regeln für "Al"',
    xp: 40,
    letters: [
        // Sonnenbuchstaben
        { char: 'ت', name: 'Teh', transliteration: 't', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ت', final: 'ـت', medial: 'ـتـ', initial: 'تـ' } },
        { char: 'ث', name: 'Theh', transliteration: 'th', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ث', final: 'ـث', medial: 'ـثـ', initial: 'ثـ' } },
        { char: 'د', name: 'Dal', transliteration: 'd', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'د', final: 'ـد', medial: 'ـد', initial: 'د' } },
        { char: 'ذ', name: 'Dhal', transliteration: 'th', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ذ', final: 'ـذ', medial: 'ـذ', initial: 'ذ' } },
        { char: 'ر', name: 'Reh', transliteration: 'r', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ر', final: 'ـر', medial: 'ـر', initial: 'ر' } },
        { char: 'ز', name: 'Zain', transliteration: 'z', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ز', final: 'ـز', medial: 'ـز', initial: 'ز' } },
        { char: 'س', name: 'Sin', transliteration: 's', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'س', final: 'ـس', medial: 'ـسـ', initial: 'سـ' } },
        { char: 'ش', name: 'Schin', transliteration: 'sch', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ش', final: 'ـش', medial: 'ـشـ', initial: 'شـ' } },
        { char: 'ص', name: 'Sad', transliteration: 'š', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ص', final: 'ـص', medial: 'ـصـ', initial: 'صـ' } },
        { char: 'ض', name: 'Dad', transliteration: 'đ', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ض', final: 'ـض', medial: 'ـضـ', initial: 'ضـ' } },
        { char: 'ط', name: 'Tah', transliteration: 'ť', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ط', final: 'ـط', medial: 'ـطـ', initial: 'طـ' } },
        { char: 'ظ', name: 'Zah', transliteration: 'ž', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ظ', final: 'ـظ', medial: 'ـظـ', initial: 'ظـ' } },
        { char: 'ل', name: 'Lam', transliteration: 'l', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ل', final: 'ـل', medial: 'ـلـ', initial: 'لـ' } },
        { char: 'ن', name: 'Nun', transliteration: 'n', explanation: '☀️ Sonnenbuchstabe', forms: { isolated: 'ن', final: 'ـن', medial: 'ـنـ', initial: 'نـ' } },
        // Mondbuchstaben
        { char: 'ا', name: 'Alif', transliteration: 'ā', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ا', final: 'ـا', medial: 'ـا', initial: 'ا' } },
        { char: 'ب', name: 'Beäh', transliteration: 'b', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ب', final: 'ـب', medial: 'ـبـ', initial: 'بـ' } },
        { char: 'ج', name: 'Geem', transliteration: 'ĝ', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ج', final: 'ـج', medial: 'ـجـ', initial: 'جـ' } },
        { char: 'ح', name: 'Hah', transliteration: 'ĥ', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ح', final: 'ـح', medial: 'ـحـ', initial: 'حـ' } },
        { char: 'خ', name: 'Khah', transliteration: 'kh', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'خ', final: 'ـخ', medial: 'ـخـ', initial: 'خـ' } },
        { char: 'ع', name: 'Ain', transliteration: 'æ', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ع', final: 'ـع', medial: 'ـعـ', initial: 'عـ' } },
        { char: 'غ', name: 'Ghain', transliteration: 'ř', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'غ', final: 'ـغ', medial: 'ـغـ', initial: 'غـ' } },
        { char: 'ف', name: 'Feh', transliteration: 'f', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ف', final: 'ـف', medial: 'ـفـ', initial: 'فـ' } },
        { char: 'ق', name: 'Qaf', transliteration: 'q', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ق', final: 'ـق', medial: 'ـقـ', initial: 'قـ' } },
        { char: 'ك', name: 'Kaf', transliteration: 'k', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ك', final: 'ـك', medial: 'ـكـ', initial: 'كـ' } },
        { char: 'م', name: 'Mim', transliteration: 'm', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'م', final: 'ـم', medial: 'ـمـ', initial: 'مـ' } },
        { char: 'ه', name: 'Heh', transliteration: 'h', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ه', final: 'ـه', medial: 'ـهـ', initial: 'هـ' } },
        { char: 'و', name: 'Waw', transliteration: 'w/u', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'و', final: 'ـو', medial: 'ـو', initial: 'و' } },
        { char: 'ي', name: 'Yeh', transliteration: 'y/i', explanation: '🌙 Mondbuchstabe', forms: { isolated: 'ي', final: 'ـي', medial: 'ـيـ', initial: 'يـ' } },
    ],
    vocabulary: [
        // Beispiele aus der Tabelle Seite 24
        { arabic: 'النَّبات', german: 'Die Pflanzen (Sonne)', transliteration: 'An-nabāt' },
        { arabic: 'اللَّبَن', german: 'Die Milch (Sonne)', transliteration: 'Al-laban' },
        { arabic: 'الظَّبي', german: 'Die Gazelle (Sonne)', transliteration: 'Az-zabi' },
        { arabic: 'الطَّبيب', german: 'Der Arzt (Sonne)', transliteration: 'At-tabib' },
        { arabic: 'الضّابِط', german: 'Der Offizier (Sonne)', transliteration: 'Ad-dabit' },
        { arabic: 'الصَّبي', german: 'Der Junge (Sonne)', transliteration: 'As-sabi' },
        { arabic: 'الشَّرَف', german: 'Die Ehre (Sonne)', transliteration: 'Asch-scharaf' },
        { arabic: 'القَمَر', german: 'Der Mond (Mond)', transliteration: 'Al-qamar' },
        { arabic: 'العِلْم', german: 'Das Wissen (Mond)', transliteration: 'Al-ilm' },
    ],
    grammar: [
        {
            title: "Sonnenbuchstaben (Ash-Shams)",
            content: [
                "Bei Sonnenbuchstaben wird das 'L' des Artikels 'Al' nicht gesprochen.",
                "Stattdessen wird der Sonnenbuchstabe verdoppelt (assimiliert).",
                "Buchstaben: T, Th, D, Dh, R, Z, S, Sch, Sad, Dad, Ta, Za, L, N.",
                "Beispiel: Al-Schams -> Asch-schams."
            ]
        },
        {
            title: "Mondbuchstaben (Al-Qamar)",
            content: [
                "Bei Mondbuchstaben wird das 'L' des Artikels 'Al' deutlich gesprochen.",
                "Buchstaben: A, B, G, H, Kh, Ain, Gh, F, Q, K, M, H, W, Y."
            ]
        }
    ]
  },
  {
    id: 'numbers_time',
    title: 'Zahlen & Zeit',
    subTitle: 'Seite 25',
    xp: 40,
    letters: [],
    vocabulary: [
        // Wochentage
        { arabic: 'الأَحَد', german: 'Sonntag', transliteration: 'Al-ahad' },
        { arabic: 'الإِثْنَيْن', german: 'Montag', transliteration: 'Al-ithnain' },
        { arabic: 'الثُّلاثاء', german: 'Dienstag', transliteration: 'Ath-thulatha' },
        { arabic: 'الأَرْبِعاء', german: 'Mittwoch', transliteration: 'Al-arbia' },
        { arabic: 'الخَميس', german: 'Donnerstag', transliteration: 'Al-khamis' },
        { arabic: 'الجُمْعة', german: 'Freitag', transliteration: 'Al-juma' },
        { arabic: 'السَّبْت', german: 'Samstag', transliteration: 'As-sabt' },
        // Monate
        { arabic: 'يَنايِر', german: 'Januar', transliteration: 'Yanair' },
        { arabic: 'فِبْرايِر', german: 'Februar', transliteration: 'Fibrair' },
        { arabic: 'مارِس', german: 'März', transliteration: 'Maris' },
        { arabic: 'أَبْريل', german: 'April', transliteration: 'Abril' },
        { arabic: 'مايو', german: 'Mai', transliteration: 'Mayu' },
        { arabic: 'يونِيَة', german: 'Juni', transliteration: 'Yunia' },
        { arabic: 'يولِيَة', german: 'Juli', transliteration: 'Yulia' },
        { arabic: 'أَغُسْطُس', german: 'August', transliteration: 'Aghustus' },
        { arabic: 'سِبْتَمْبَر', german: 'September', transliteration: 'Sibtambar' },
        { arabic: 'أُكْتوبَر', german: 'Oktober', transliteration: 'Uktubar' },
        { arabic: 'نوفَمْبَر', german: 'November', transliteration: 'Nufambar' },
        { arabic: 'ديسَمْبَر', german: 'Dezember', transliteration: 'Disambar' },
        // Zahlen
        { arabic: '٠', german: '0 (sifr)', transliteration: 'sifr' },
        { arabic: '١', german: '1 (wahid)', transliteration: 'wahid' },
        { arabic: '٢', german: '2 (ithnan)', transliteration: 'ithnan' },
        { arabic: '٣', german: '3 (thalatha)', transliteration: 'thalatha' },
        { arabic: '٤', german: '4 (arba)', transliteration: 'arba' },
        { arabic: '٥', german: '5 (khamsa)', transliteration: 'khamsa' },
        { arabic: '٦', german: '6 (sitta)', transliteration: 'sitta' },
        { arabic: '٧', german: '7 (saba)', transliteration: 'saba' },
        { arabic: '٨', german: '8 (thamaniya)', transliteration: 'thamaniya' },
        { arabic: '٩', german: '9 (tisa)', transliteration: 'tisa' },
    ]
  },
  {
    id: 'alphabet_ref',
    title: 'Alle Buchstaben',
    subTitle: 'Alphabetische Reihenfolge (S. 26)',
    xp: 50,
    letters: [
      { char: 'ا', name: 'Alif', transliteration: 'ā', forms: { isolated: 'ا', final: 'ـا', medial: 'ـا', initial: 'ا' } },
      { char: 'ب', name: 'Beäh', transliteration: 'b', forms: { isolated: 'ب', final: 'ـب', medial: 'ـبـ', initial: 'بـ' } },
      { char: 'ت', name: 'Teh', transliteration: 't', forms: { isolated: 'ت', final: 'ـت', medial: 'ـتـ', initial: 'تـ' } },
      { char: 'ث', name: 'Theh', transliteration: 'th', forms: { isolated: 'ث', final: 'ـث', medial: 'ـثـ', initial: 'ثـ' } },
      { char: 'ج', name: 'Geem', transliteration: 'ĝ', forms: { isolated: 'ج', final: 'ـج', medial: 'ـجـ', initial: 'جـ' } },
      { char: 'ح', name: 'Hah', transliteration: 'ĥ', forms: { isolated: 'ح', final: 'ـح', medial: 'ـحـ', initial: 'حـ' } },
      { char: 'خ', name: 'Khah', transliteration: 'kh', forms: { isolated: 'خ', final: 'ـخ', medial: 'ـخـ', initial: 'خـ' } },
      { char: 'د', name: 'Dal', transliteration: 'd', forms: { isolated: 'د', final: 'ـد', medial: 'ـد', initial: 'د' } },
      { char: 'ذ', name: 'Dhal', transliteration: 'th', forms: { isolated: 'ذ', final: 'ـذ', medial: 'ـذ', initial: 'ذ' } },
      { char: 'ر', name: 'Reh', transliteration: 'r', forms: { isolated: 'ر', final: 'ـر', medial: 'ـر', initial: 'ر' } },
      { char: 'ز', name: 'Zain', transliteration: 'z', forms: { isolated: 'ز', final: 'ـز', medial: 'ـز', initial: 'ز' } },
      { char: 'س', name: 'Sin', transliteration: 's', forms: { isolated: 'س', final: 'ـس', medial: 'ـسـ', initial: 'سـ' } },
      { char: 'ش', name: 'Schin', transliteration: 'sch', forms: { isolated: 'ش', final: 'ـش', medial: 'ـشـ', initial: 'شـ' } },
      { char: 'ص', name: 'Sad', transliteration: 'š', forms: { isolated: 'ص', final: 'ـص', medial: 'ـصـ', initial: 'صـ' } },
      { char: 'ض', name: 'Dad', transliteration: 'đ', forms: { isolated: 'ض', final: 'ـض', medial: 'ـضـ', initial: 'ضـ' } },
      { char: 'ط', name: 'Tah', transliteration: 'ť', forms: { isolated: 'ط', final: 'ـط', medial: 'ـطـ', initial: 'طـ' } },
      { char: 'ظ', name: 'Zah', transliteration: 'ž', forms: { isolated: 'ظ', final: 'ـظ', medial: 'ـظـ', initial: 'ظـ' } },
      { char: 'ع', name: 'Ain', transliteration: 'æ', forms: { isolated: 'ع', final: 'ـع', medial: 'ـعـ', initial: 'عـ' } },
      { char: 'غ', name: 'Ghain', transliteration: 'ř', forms: { isolated: 'غ', final: 'ـغ', medial: 'ـغـ', initial: 'غـ' } },
      { char: 'ف', name: 'Feh', transliteration: 'f', forms: { isolated: 'ف', final: 'ـف', medial: 'ـفـ', initial: 'فـ' } },
      { char: 'ق', name: 'Qaf', transliteration: 'q', forms: { isolated: 'ق', final: 'ـق', medial: 'ـقـ', initial: 'قـ' } },
      { char: 'ك', name: 'Kaf', transliteration: 'k', forms: { isolated: 'ك', final: 'ـك', medial: 'ـكـ', initial: 'كـ' } },
      { char: 'ل', name: 'Lam', transliteration: 'l', forms: { isolated: 'ل', final: 'ـل', medial: 'ـلـ', initial: 'لـ' } },
      { char: 'م', name: 'Mim', transliteration: 'm', forms: { isolated: 'م', final: 'ـم', medial: 'ـمـ', initial: 'مـ' } },
      { char: 'ن', name: 'Nun', transliteration: 'n', forms: { isolated: 'ن', final: 'ـن', medial: 'ـنـ', initial: 'نـ' } },
      { char: 'ه', name: 'Heh', transliteration: 'h', forms: { isolated: 'ه', final: 'ـه', medial: 'ـهـ', initial: 'هـ' } },
      { char: 'و', name: 'Waw', transliteration: 'w/u', forms: { isolated: 'و', final: 'ـو', medial: 'ـو', initial: 'و' } },
      { char: 'ي', name: 'Yeh', transliteration: 'y/i', forms: { isolated: 'ي', final: 'ـي', medial: 'ـيـ', initial: 'يـ' } },
    ],
    vocabulary: []
  }
];
