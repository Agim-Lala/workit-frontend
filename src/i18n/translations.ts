import type { Language } from './config'

/**
 * Flat key -> string tables. `en` is the source of truth; `sq` must provide the
 * same keys (enforced by the `Record<TranslationKey, string>` type below).
 * Use `{name}` placeholders with the `vars` argument of `t()`.
 */
const en = {
  // Shared controls
  'common.createAccount': 'Create an account',
  'common.createAccountShort': 'Create account',
  'common.signIn': 'Sign in',
  'common.signOut': 'Sign out',
  'common.createBusinessAccount': 'Create a business account',
  'common.learnMore': 'Learn more',

  // Navigation / layout chrome
  'nav.howItWorks': 'How it works',
  'nav.forBusinesses': 'For businesses',
  'nav.language': 'Language',
  'nav.selectLanguage': 'Select language',
  'nav.main': 'Main navigation',
  'nav.public': 'Public navigation',
  'nav.workitHome': 'Workit home',
  'nav.jobs': 'Jobs',
  'nav.applications': 'Applications',
  'nav.profile': 'Profile',
  'nav.overview': 'Overview',
  'nav.jobOpenings': 'Job openings',
  'nav.newOpening': 'New opening',

  // Home — hero
  'home.hero.title': 'Work that fits your life.',
  'home.hero.body':
    'Workit connects workers and businesses around flexible opportunities, with the role, schedule, location, and pay made clear from the start.',
  'home.hero.signInNote':
    'Sign in to access current listings, full job details, and applications.',

  // Home — preview card
  'home.preview.label': 'Illustrative opportunity',
  'home.preview.cta': 'Sign in to view details',
  'home.preview.chooseJob': 'Choose preview job',
  'home.preview.showJob': 'Show {title}',
  'home.preview.disclaimer':
    'Preview listings are illustrative. Sign in to see current openings.',
  'home.fact.location': 'Location',
  'home.fact.schedule': 'Schedule',
  'home.fact.pay': 'Pay',
  'home.job1.title': 'Weekend event crew',
  'home.job1.role': 'Event staff',
  'home.job1.schedule': 'Fri–Sun evenings',
  'home.job2.title': 'Morning barista',
  'home.job2.role': 'Hospitality',
  'home.job2.schedule': '07:00–13:00',
  'home.job3.title': 'Retail launch assistant',
  'home.job3.role': 'Retail',
  'home.job3.schedule': 'Aug 12–16',

  // Home — band
  'home.band': 'Every listing shows the role, place, schedule, and pay before you commit.',

  // Home — how it works teaser
  'home.how.title': 'How Workit works',
  'home.how.body':
    'The same clear path on both sides of a job: set out the practical facts, then move from interest to a well-informed next step.',
  'home.how.forWorkers': 'For workers',
  'home.how.forBusinesses': 'For businesses',
  'home.how.worker1.title': 'Create your account',
  'home.how.worker1.body': 'Tell us your city and the kind of work you’re looking for.',
  'home.how.worker2.title': 'Browse openings near you',
  'home.how.worker2.body': 'Every listing shows the role, schedule, location, and pay up front.',
  'home.how.worker3.title': 'Apply and track',
  'home.how.worker3.body': 'Send an application and follow where it stands in one place.',
  'home.how.business1.title': 'Create a business account',
  'home.how.business1.body': 'Register once as an employer to unlock publishing.',
  'home.how.business2.title': 'Post an opening',
  'home.how.business2.body': 'Set the role, dates, hours, pay, and how many people you need.',
  'home.how.business3.title': 'Review who’s available',
  'home.how.business3.body': 'See applicants against the schedule and move forward.',
  'home.how.link': 'See how Workit works',

  // Home — for businesses teaser
  'home.business.title': 'Built for the people doing the hiring.',
  'home.business.body':
    'Publish permanent roles, focused projects, and short-term shifts with the expectations spelled out, so the people who apply already know what the work involves.',
  'home.business.workTypes.term': 'Work types',
  'home.business.workTypes.detail': 'Permanent roles, focused projects, and short-term shifts.',
  'home.business.pay.term': 'Pay',
  'home.business.pay.detail': 'Hourly, daily, fixed, or monthly.',
  'home.business.shifts.term': 'Shifts',
  'home.business.shifts.detail': 'Morning, evening, or custom hours with start and end dates.',
  'home.business.crew.term': 'Crew size',
  'home.business.crew.detail': 'One person or a full team on a single opening.',
  'home.business.link': 'Explore Workit for businesses',

  // Home — values
  'home.values.title': 'What Workit stands for.',
  'home.values.body':
    'Opportunity without unnecessary barriers, transparency before commitment, and respect for the time on both sides of every job.',
  'home.values.accessible.title': 'Accessible',
  'home.values.accessible.body': 'A clear path from interest to work.',
  'home.values.transparent.title': 'Transparent',
  'home.values.transparent.body': 'Role, place, schedule, and pay before commitment.',
  'home.values.respectful.title': 'Respectful',
  'home.values.respectful.body': 'People’s time and contribution stay visible.',

  // Home — closing CTA
  'home.cta.title': 'Ready to move from preview to opportunity?',
  'home.cta.body':
    'Create the account that matches how you work, then enter the full Workit workspace.',

  // Auth — shared
  'auth.backToWorkit': 'Back to Workit',
  'auth.field.email': 'Email',
  'auth.field.password': 'Password',
  'auth.field.firstName': 'First name',
  'auth.field.lastName': 'Last name',
  'auth.field.cityArea': 'City or area',
  'auth.field.businessName': 'Business name',
  'auth.field.businessAddress': 'Business address',
  'auth.field.phone': 'Phone',
  'auth.placeholder.password': 'Minimum 8 characters',

  // Auth — login
  'auth.login.brandTitle': 'Pick up where work left off.',
  'auth.login.brandBody':
    'One sign-in opens the workspace that matches your role — job discovery for workers and job publishing for businesses.',
  'auth.login.brandFoot': 'Role, place, schedule, and pay stay visible throughout Workit.',
  'auth.login.title': 'Sign in.',
  'auth.login.subtitle':
    'Enter your details to continue to the worker or business workspace.',
  'auth.login.newHere': 'New to Workit?',
  'auth.login.submit': 'Sign in',
  'auth.login.submitting': 'Signing in…',
  'auth.login.error': 'Unable to sign in with those credentials.',

  // Auth — signup
  'auth.signup.title': 'Choose how you use Workit.',
  'auth.signup.subtitle':
    'Choose worker or business, enter the basics, and get straight into the workflows that match your role.',
  'auth.signup.workerName': 'Worker',
  'auth.signup.workerDesc': 'Find shifts, apply quickly, and manage your profile.',
  'auth.signup.businessName': 'Business',
  'auth.signup.businessDesc': 'Post openings, review applicants, and fill shifts.',
  'auth.signup.selected': 'Selected',
  'auth.signup.workerHeading': 'Worker sign up',
  'auth.signup.businessHeading': 'Business sign up',
  'auth.signup.haveAccount': 'Already have an account?',
  'auth.signup.locationHint':
    'Workit uses this to show openings whose work location includes your city or area.',
  'auth.signup.submit': 'Create account',
  'auth.signup.submitting': 'Creating account…',
  'auth.signup.error': 'Unable to create that account. Try another email.',

  // How it works page
  'howItWorks.title': 'How Workit works',
  'howItWorks.intro':
    'Workit connects workers and businesses around permanent roles, focused projects, and short-term shifts. Both sides see the practical facts up front, then move from interest to a well-informed next step.',
  'howItWorks.workers.heading': 'For workers',
  'howItWorks.workers.step1.title': 'Create your account',
  'howItWorks.workers.step1.body':
    'Register as a worker and save the city or area where you want to work.',
  'howItWorks.workers.step2.title': 'Browse openings near you',
  'howItWorks.workers.step2.body':
    'Signed-in discovery matches your saved location against each opening. Every listing shows the role, schedule, location, and pay.',
  'howItWorks.workers.step3.title': 'Open the full details',
  'howItWorks.workers.step3.body':
    'Check the description, dates, hours, pay type, and how many people are needed before you decide.',
  'howItWorks.workers.step4.title': 'Apply and track',
  'howItWorks.workers.step4.body':
    'Send an application and follow where it stands from your applications list.',
  'howItWorks.businesses.heading': 'For businesses',
  'howItWorks.businesses.step1.title': 'Create a business account',
  'howItWorks.businesses.step1.body': 'Register as an employer to unlock the publishing tools.',
  'howItWorks.businesses.step2.title': 'Describe the opening',
  'howItWorks.businesses.step2.body':
    'Set the role, description, and work location so applicants know what the job involves.',
  'howItWorks.businesses.step3.title': 'Shape the schedule and pay',
  'howItWorks.businesses.step3.body':
    'Choose the employment type, dates, shift pattern, hours, pay, and crew size.',
  'howItWorks.businesses.step4.title': 'Publish and review',
  'howItWorks.businesses.step4.body':
    'Send the opening live to workers and review who is available.',
  'howItWorks.clear.title': 'Clear before anyone commits',
  'howItWorks.clear.body':
    'Every opening carries the same practical facts — on the listing and in the full details.',
  'howItWorks.clear.role.term': 'Role',
  'howItWorks.clear.role.detail': 'The job and the kind of work involved.',
  'howItWorks.clear.place.term': 'Place',
  'howItWorks.clear.place.detail': 'The work location, matched to a worker’s saved area.',
  'howItWorks.clear.schedule.term': 'Schedule',
  'howItWorks.clear.schedule.detail': 'Employment type, dates, shift pattern, and hours.',
  'howItWorks.clear.pay.term': 'Pay',
  'howItWorks.clear.pay.detail': 'The amount, and whether it is hourly, daily, fixed, or monthly.',
  'howItWorks.clear.capacity.term': 'Capacity',
  'howItWorks.clear.capacity.detail': 'How many people the opening needs.',
  'howItWorks.access.title': 'What needs an account',
  'howItWorks.access.body':
    'Anyone can read this page and preview a few example openings. Current job discovery, full details, applications, profiles, and business publishing open up once you sign in.',
  'howItWorks.cta.title': 'Ready to start?',
  'howItWorks.cta.body': 'Create the account that matches how you work.',

  // For businesses page
  'forBusinesses.title': 'Workit for businesses',
  'forBusinesses.intro':
    'Publish permanent roles, focused projects, and short-term shifts with the expectations spelled out, so the people who apply already know what the work involves.',
  'forBusinesses.workTypes.title': 'What you can post',
  'forBusinesses.workTypes.permanent.term': 'Permanent roles',
  'forBusinesses.workTypes.permanent.detail': 'Ongoing positions with a set schedule.',
  'forBusinesses.workTypes.project.term': 'Projects',
  'forBusinesses.workTypes.project.detail': 'Focused work with a start and an end date.',
  'forBusinesses.workTypes.shortTerm.term': 'Short-term shifts',
  'forBusinesses.workTypes.shortTerm.detail': 'One-off or occasional cover, filled quickly.',
  'forBusinesses.pay.title': 'How pay is shown',
  'forBusinesses.pay.body':
    'Set an amount and the period it applies to. Workers see it on the listing before they apply.',
  'forBusinesses.pay.hourly': 'Hourly',
  'forBusinesses.pay.daily': 'Daily',
  'forBusinesses.pay.fixed': 'Fixed',
  'forBusinesses.pay.monthly': 'Monthly',
  'forBusinesses.schedule.title': 'Scheduling and crew',
  'forBusinesses.schedule.shifts.term': 'Shift pattern',
  'forBusinesses.schedule.shifts.detail': 'Morning, evening, or custom hours.',
  'forBusinesses.schedule.dates.term': 'Dates',
  'forBusinesses.schedule.dates.detail': 'Start and end dates for the work.',
  'forBusinesses.schedule.crew.term': 'Crew size',
  'forBusinesses.schedule.crew.detail': 'One person or a full team on a single opening.',
  'forBusinesses.steps.title': 'Publishing an opening',
  'forBusinesses.steps.step1': 'Add the essentials — role, description, and location.',
  'forBusinesses.steps.step2': 'Shape the schedule — type, dates, shift, and hours.',
  'forBusinesses.steps.step3': 'Set the pay and crew size.',
  'forBusinesses.steps.step4': 'Publish it to workers.',
  'forBusinesses.cta.title': 'Create a business account',
  'forBusinesses.cta.body': 'Register as an employer and publish your first opening.',

  // Worker profile
  'workerProfile.hero.title': 'Jobs should meet you where you are.',
  'workerProfile.hero.body':
    'Your saved city or area shapes both the opportunity list and the short-term job calendar.',
  'workerProfile.loading': 'Loading your profile…',
  'workerProfile.loadError.title': 'Your profile could not load.',
  'workerProfile.loadError.body': 'Check your connection and try loading the profile again.',
  'workerProfile.tryAgain': 'Try again',

  'workerProfile.location.title': 'Location preference',
  'workerProfile.location.body':
    'Workit matches this text against each opening’s work location. Use a city or recognizable area such as Tirana or Durrës.',
  'workerProfile.location.verifiedBadge': 'Verified',
  'workerProfile.location.fieldLabel': 'City or area',
  'workerProfile.location.hint': 'Changing this refreshes your job list and calendar automatically.',
  'workerProfile.location.savedVerified': 'Location saved and verified.',
  'workerProfile.location.savedUnverified': 'Location saved, but we couldn’t verify it against a real place.',
  'workerProfile.location.error': 'Location could not be saved. Try again.',
  'workerProfile.location.submit': 'Save location',
  'workerProfile.location.submitting': 'Saving location…',

  'workerProfile.documents.title': 'CV and photo',
  'workerProfile.documents.body': 'Businesses reviewing your applications can see these.',
  'workerProfile.documents.cv.label': 'CV',
  'workerProfile.documents.cv.empty': 'No CV uploaded yet.',
  'workerProfile.documents.cv.uploadedOn': 'Uploaded {date}',
  'workerProfile.documents.cv.upload': 'Upload CV',
  'workerProfile.documents.cv.replace': 'Replace CV',
  'workerProfile.documents.cv.download': 'Download',
  'workerProfile.documents.cv.uploading': 'Uploading…',
  'workerProfile.documents.cv.hint': 'PDF, up to 5MB.',
  'workerProfile.documents.cv.error': 'The CV could not be uploaded. Check the file and try again.',
  'workerProfile.documents.photo.label': 'Profile photo',
  'workerProfile.documents.photo.empty': 'No photo uploaded yet.',
  'workerProfile.documents.photo.upload': 'Upload photo',
  'workerProfile.documents.photo.replace': 'Change photo',
  'workerProfile.documents.photo.uploading': 'Uploading…',
  'workerProfile.documents.photo.hint': 'JPEG, PNG, or WebP, up to 5MB.',
  'workerProfile.documents.photo.error': 'The photo could not be uploaded. Check the file and try again.',

  'workerProfile.preferences.title': 'Preferences',
  'workerProfile.preferences.body': 'Tell businesses what kind of work and schedule you’re looking for.',
  'workerProfile.preferences.fieldsLabel': 'Interested fields',
  'workerProfile.preferences.fieldsPlaceholder': 'e.g. Bartending',
  'workerProfile.preferences.fieldsAdd': 'Add',
  'workerProfile.preferences.fieldsHint': 'Up to 15. Press Enter or click Add.',
  'workerProfile.preferences.fieldsEmpty': 'No fields added yet.',
  'workerProfile.preferences.removeField': 'Remove {field}',
  'workerProfile.preferences.shiftsLabel': 'Preferred shifts',
  'workerProfile.preferences.shift.morning': 'Morning',
  'workerProfile.preferences.shift.evening': 'Evening',
  'workerProfile.preferences.shift.customHours': 'Custom hours',
  'workerProfile.preferences.submit': 'Save preferences',
  'workerProfile.preferences.submitting': 'Saving…',
  'workerProfile.preferences.saved': 'Preferences saved.',
  'workerProfile.preferences.error': 'Preferences could not be saved. Try again.',

  'workerProfile.verification.title': 'Identity verification',
  'workerProfile.verification.body': 'Verify your identity with an ID to get a verified badge on your profile.',
  'workerProfile.verification.start': 'Verify with ID',
  'workerProfile.verification.starting': 'Starting…',
  'workerProfile.verification.error': 'Verification could not be started. Try again.',
  'workerProfile.verification.pendingHint':
    'Complete verification in the new tab. This page will update once it’s reviewed.',
  'workerProfile.verification.refresh': 'Refresh status',
  'workerProfile.verification.verifiedHint': 'Your identity is verified.',
  'workerProfile.verification.rejectedHint': 'Verification wasn’t successful. You can try again.',
} as const

export type TranslationKey = keyof typeof en

const sq: Record<TranslationKey, string> = {
  'common.createAccount': 'Krijo një llogari',
  'common.createAccountShort': 'Krijo llogari',
  'common.signIn': 'Hyr',
  'common.signOut': 'Dil',
  'common.createBusinessAccount': 'Krijo një llogari biznesi',
  'common.learnMore': 'Mëso më shumë',

  'nav.howItWorks': 'Si funksionon',
  'nav.forBusinesses': 'Për bizneset',
  'nav.language': 'Gjuha',
  'nav.selectLanguage': 'Zgjidh gjuhën',
  'nav.main': 'Navigimi kryesor',
  'nav.public': 'Navigimi publik',
  'nav.workitHome': 'Workit — ballina',
  'nav.jobs': 'Punët',
  'nav.applications': 'Aplikimet',
  'nav.profile': 'Profili',
  'nav.overview': 'Përmbledhje',
  'nav.jobOpenings': 'Shpalljet e punës',
  'nav.newOpening': 'Shpallje e re',

  'home.hero.title': 'Punë që i përshtatet jetës sate.',
  'home.hero.body':
    'Workit lidh punëtorët dhe bizneset përreth mundësive fleksibël, me rolin, orarin, vendndodhjen dhe pagesën të qarta që në fillim.',
  'home.hero.signInNote':
    'Hyr për të parë shpalljet aktuale, detajet e plota të punës dhe aplikimet.',

  'home.preview.label': 'Mundësi ilustruese',
  'home.preview.cta': 'Hyr për të parë detajet',
  'home.preview.chooseJob': 'Zgjidh punën e shembullit',
  'home.preview.showJob': 'Shfaq {title}',
  'home.preview.disclaimer':
    'Shpalljet e parapamjes janë ilustruese. Hyr për të parë shpalljet aktuale.',
  'home.fact.location': 'Vendndodhja',
  'home.fact.schedule': 'Orari',
  'home.fact.pay': 'Pagesa',
  'home.job1.title': 'Ekip eventi fundjave',
  'home.job1.role': 'Staf eventesh',
  'home.job1.schedule': 'Pre–Diel, mbrëmjeve',
  'home.job2.title': 'Barist mëngjesi',
  'home.job2.role': 'Mikpritje',
  'home.job2.schedule': '07:00–13:00',
  'home.job3.title': 'Asistent hapjeje dyqani',
  'home.job3.role': 'Shitje me pakicë',
  'home.job3.schedule': '12–16 gusht',

  'home.band':
    'Çdo shpallje tregon rolin, vendin, orarin dhe pagesën para se të angazhohesh.',

  'home.how.title': 'Si funksionon Workit',
  'home.how.body':
    'I njëjti rrugëtim i qartë në të dyja anët e një pune: paraqit faktet praktike, pastaj kalo nga interesi te hapi tjetër i mirëinformuar.',
  'home.how.forWorkers': 'Për punëtorët',
  'home.how.forBusinesses': 'Për bizneset',
  'home.how.worker1.title': 'Krijo llogarinë tënde',
  'home.how.worker1.body': 'Na trego qytetin tënd dhe llojin e punës që kërkon.',
  'home.how.worker2.title': 'Shfleto shpalljet pranë teje',
  'home.how.worker2.body': 'Çdo shpallje tregon që në fillim rolin, orarin, vendndodhjen dhe pagesën.',
  'home.how.worker3.title': 'Apliko dhe ndiq',
  'home.how.worker3.body': 'Dërgo një aplikim dhe ndiq statusin e tij në një vend të vetëm.',
  'home.how.business1.title': 'Krijo një llogari biznesi',
  'home.how.business1.body': 'Regjistrohu një herë si punëdhënës për të zhbllokuar publikimin.',
  'home.how.business2.title': 'Publiko një shpallje',
  'home.how.business2.body': 'Cakto rolin, datat, orët, pagesën dhe sa persona të duhen.',
  'home.how.business3.title': 'Shqyrto kush është i disponueshëm',
  'home.how.business3.body': 'Shiko aplikuesit përballë orarit dhe ec përpara.',
  'home.how.link': 'Shiko si funksionon Workit',

  'home.business.title': 'Ndërtuar për ata që punësojnë.',
  'home.business.body':
    'Publiko role të përhershme, projekte të fokusuara dhe turne afatshkurtra me pritshmëritë të shprehura qartë, që ata që aplikojnë të dinë tashmë çfarë përfshin puna.',
  'home.business.workTypes.term': 'Llojet e punës',
  'home.business.workTypes.detail': 'Role të përhershme, projekte të fokusuara dhe turne afatshkurtra.',
  'home.business.pay.term': 'Pagesa',
  'home.business.pay.detail': 'Në orë, në ditë, fikse ose mujore.',
  'home.business.shifts.term': 'Turnet',
  'home.business.shifts.detail': 'Mëngjes, mbrëmje ose orë të personalizuara, me data fillimi e mbarimi.',
  'home.business.crew.term': 'Madhësia e ekipit',
  'home.business.crew.detail': 'Një person ose një ekip i plotë në një shpallje të vetme.',
  'home.business.link': 'Zbulo Workit për bizneset',

  'home.values.title': 'Për çfarë qëndron Workit.',
  'home.values.body':
    'Mundësi pa pengesa të panevojshme, transparencë para angazhimit dhe respekt për kohën në të dyja anët e çdo pune.',
  'home.values.accessible.title': 'I aksesueshëm',
  'home.values.accessible.body': 'Një rrugë e qartë nga interesi te puna.',
  'home.values.transparent.title': 'Transparent',
  'home.values.transparent.body': 'Roli, vendi, orari dhe pagesa para angazhimit.',
  'home.values.respectful.title': 'Respektues',
  'home.values.respectful.body': 'Koha dhe kontributi i njerëzve mbeten të dukshme.',

  'home.cta.title': 'Gati të kalosh nga parapamja te mundësia?',
  'home.cta.body':
    'Krijo llogarinë që i përshtatet mënyrës sate të punës, pastaj hyr në hapësirën e plotë të Workit.',

  'auth.backToWorkit': 'Kthehu te Workit',
  'auth.field.email': 'Email',
  'auth.field.password': 'Fjalëkalimi',
  'auth.field.firstName': 'Emri',
  'auth.field.lastName': 'Mbiemri',
  'auth.field.cityArea': 'Qyteti ose zona',
  'auth.field.businessName': 'Emri i biznesit',
  'auth.field.businessAddress': 'Adresa e biznesit',
  'auth.field.phone': 'Telefoni',
  'auth.placeholder.password': 'Minimumi 8 karaktere',

  'auth.login.brandTitle': 'Vazhdo nga aty ku e le punën.',
  'auth.login.brandBody':
    'Një hyrje e vetme hap hapësirën që i përshtatet rolit tënd — kërkim punësh për punëtorët dhe publikim punësh për bizneset.',
  'auth.login.brandFoot': 'Roli, vendi, orari dhe pagesa mbeten të dukshme në gjithë Workit.',
  'auth.login.title': 'Hyr.',
  'auth.login.subtitle':
    'Vendos të dhënat e tua për të vazhduar te hapësira e punëtorit ose e biznesit.',
  'auth.login.newHere': 'I ri në Workit?',
  'auth.login.submit': 'Hyr',
  'auth.login.submitting': 'Po hyn…',
  'auth.login.error': 'Nuk mund të hysh me ato kredenciale.',

  'auth.signup.title': 'Zgjidh si e përdor Workit.',
  'auth.signup.subtitle':
    'Zgjidh punëtor ose biznes, vendos të dhënat bazë dhe hyr drejt e në rrjedhat që i përshtaten rolit tënd.',
  'auth.signup.workerName': 'Punëtor',
  'auth.signup.workerDesc': 'Gjej turne, apliko shpejt dhe menaxho profilin tënd.',
  'auth.signup.businessName': 'Biznes',
  'auth.signup.businessDesc': 'Publiko shpallje, shqyrto aplikuesit dhe plotëso turnet.',
  'auth.signup.selected': 'E zgjedhur',
  'auth.signup.workerHeading': 'Regjistrim punëtori',
  'auth.signup.businessHeading': 'Regjistrim biznesi',
  'auth.signup.haveAccount': 'Ke tashmë një llogari?',
  'auth.signup.locationHint':
    'Workit e përdor këtë për të shfaqur shpalljet vendndodhja e punës e të cilave përfshin qytetin ose zonën tënde.',
  'auth.signup.submit': 'Krijo llogari',
  'auth.signup.submitting': 'Po krijohet llogaria…',
  'auth.signup.error': 'Nuk mund të krijohet ajo llogari. Provo një email tjetër.',

  'howItWorks.title': 'Si funksionon Workit',
  'howItWorks.intro':
    'Workit lidh punëtorët dhe bizneset përreth roleve të përhershme, projekteve të fokusuara dhe turneve afatshkurtra. Të dyja anët i shohin faktet praktike që në fillim, pastaj kalojnë nga interesi te hapi tjetër i mirëinformuar.',
  'howItWorks.workers.heading': 'Për punëtorët',
  'howItWorks.workers.step1.title': 'Krijo llogarinë tënde',
  'howItWorks.workers.step1.body':
    'Regjistrohu si punëtor dhe ruaj qytetin ose zonën ku dëshiron të punosh.',
  'howItWorks.workers.step2.title': 'Shfleto shpalljet pranë teje',
  'howItWorks.workers.step2.body':
    'Kërkimi pas hyrjes përputh vendndodhjen tënde të ruajtur me çdo shpallje. Çdo shpallje tregon rolin, orarin, vendndodhjen dhe pagesën.',
  'howItWorks.workers.step3.title': 'Hap detajet e plota',
  'howItWorks.workers.step3.body':
    'Shiko përshkrimin, datat, orët, llojin e pagesës dhe sa persona duhen para se të vendosësh.',
  'howItWorks.workers.step4.title': 'Apliko dhe ndiq',
  'howItWorks.workers.step4.body':
    'Dërgo një aplikim dhe ndiq statusin e tij nga lista jote e aplikimeve.',
  'howItWorks.businesses.heading': 'Për bizneset',
  'howItWorks.businesses.step1.title': 'Krijo një llogari biznesi',
  'howItWorks.businesses.step1.body': 'Regjistrohu si punëdhënës për të zhbllokuar mjetet e publikimit.',
  'howItWorks.businesses.step2.title': 'Përshkruaj shpalljen',
  'howItWorks.businesses.step2.body':
    'Cakto rolin, përshkrimin dhe vendndodhjen e punës që aplikuesit të dinë çfarë përfshin puna.',
  'howItWorks.businesses.step3.title': 'Formëso orarin dhe pagesën',
  'howItWorks.businesses.step3.body':
    'Zgjidh llojin e punësimit, datat, modelin e turnit, orët, pagesën dhe madhësinë e ekipit.',
  'howItWorks.businesses.step4.title': 'Publiko dhe shqyrto',
  'howItWorks.businesses.step4.body':
    'Dërgoje shpalljen te punëtorët dhe shqyrto kush është i disponueshëm.',
  'howItWorks.clear.title': 'E qartë para se dikush të angazhohet',
  'howItWorks.clear.body':
    'Çdo shpallje mban të njëjtat fakte praktike — në listë dhe në detajet e plota.',
  'howItWorks.clear.role.term': 'Roli',
  'howItWorks.clear.role.detail': 'Puna dhe lloji i punës që përfshihet.',
  'howItWorks.clear.place.term': 'Vendi',
  'howItWorks.clear.place.detail': 'Vendndodhja e punës, e përputhur me zonën e ruajtur të punëtorit.',
  'howItWorks.clear.schedule.term': 'Orari',
  'howItWorks.clear.schedule.detail': 'Lloji i punësimit, datat, modeli i turnit dhe orët.',
  'howItWorks.clear.pay.term': 'Pagesa',
  'howItWorks.clear.pay.detail': 'Shuma, dhe nëse është në orë, në ditë, fikse ose mujore.',
  'howItWorks.clear.capacity.term': 'Kapaciteti',
  'howItWorks.clear.capacity.detail': 'Sa persona i duhen shpalljes.',
  'howItWorks.access.title': 'Çfarë kërkon llogari',
  'howItWorks.access.body':
    'Kushdo mund ta lexojë këtë faqe dhe të shohë disa shpallje shembull. Kërkimi aktual i punëve, detajet e plota, aplikimet, profilet dhe publikimi për bizneset hapen sapo të hysh.',
  'howItWorks.cta.title': 'Gati për të filluar?',
  'howItWorks.cta.body': 'Krijo llogarinë që i përshtatet mënyrës sate të punës.',

  'forBusinesses.title': 'Workit për bizneset',
  'forBusinesses.intro':
    'Publiko role të përhershme, projekte të fokusuara dhe turne afatshkurtra me pritshmëritë të shprehura qartë, që ata që aplikojnë të dinë tashmë çfarë përfshin puna.',
  'forBusinesses.workTypes.title': 'Çfarë mund të publikosh',
  'forBusinesses.workTypes.permanent.term': 'Role të përhershme',
  'forBusinesses.workTypes.permanent.detail': 'Pozicione të vazhdueshme me orar të caktuar.',
  'forBusinesses.workTypes.project.term': 'Projekte',
  'forBusinesses.workTypes.project.detail': 'Punë e fokusuar me një datë fillimi dhe mbarimi.',
  'forBusinesses.workTypes.shortTerm.term': 'Turne afatshkurtra',
  'forBusinesses.workTypes.shortTerm.detail': 'Zëvendësim një herësh ose i rastit, i plotësuar shpejt.',
  'forBusinesses.pay.title': 'Si shfaqet pagesa',
  'forBusinesses.pay.body':
    'Cakto një shumë dhe periudhën për të cilën vlen. Punëtorët e shohin në shpallje para se të aplikojnë.',
  'forBusinesses.pay.hourly': 'Në orë',
  'forBusinesses.pay.daily': 'Në ditë',
  'forBusinesses.pay.fixed': 'Fikse',
  'forBusinesses.pay.monthly': 'Mujore',
  'forBusinesses.schedule.title': 'Orari dhe ekipi',
  'forBusinesses.schedule.shifts.term': 'Modeli i turnit',
  'forBusinesses.schedule.shifts.detail': 'Mëngjes, mbrëmje ose orë të personalizuara.',
  'forBusinesses.schedule.dates.term': 'Datat',
  'forBusinesses.schedule.dates.detail': 'Datat e fillimit dhe të mbarimit të punës.',
  'forBusinesses.schedule.crew.term': 'Madhësia e ekipit',
  'forBusinesses.schedule.crew.detail': 'Një person ose një ekip i plotë në një shpallje të vetme.',
  'forBusinesses.steps.title': 'Publikimi i një shpalljeje',
  'forBusinesses.steps.step1': 'Shto thelbësoret — rolin, përshkrimin dhe vendndodhjen.',
  'forBusinesses.steps.step2': 'Formëso orarin — llojin, datat, turnin dhe orët.',
  'forBusinesses.steps.step3': 'Cakto pagesën dhe madhësinë e ekipit.',
  'forBusinesses.steps.step4': 'Publikoje te punëtorët.',
  'forBusinesses.cta.title': 'Krijo një llogari biznesi',
  'forBusinesses.cta.body': 'Regjistrohu si punëdhënës dhe publiko shpalljen tënde të parë.',

  'workerProfile.hero.title': 'Puna duhet të të gjejë aty ku je.',
  'workerProfile.hero.body':
    'Qyteti ose zona jote e ruajtur formëson si listën e mundësive ashtu edhe kalendarin e punëve afatshkurtra.',
  'workerProfile.loading': 'Po ngarkohet profili yt…',
  'workerProfile.loadError.title': 'Profili yt nuk u ngarkua dot.',
  'workerProfile.loadError.body': 'Kontrollo lidhjen dhe provo të ngarkosh profilin përsëri.',
  'workerProfile.tryAgain': 'Provo përsëri',

  'workerProfile.location.title': 'Preferenca e vendndodhjes',
  'workerProfile.location.body':
    'Workit e krahason këtë tekst me vendndodhjen e punës së çdo shpalljeje. Përdor një qytet ose zonë të njohur si Tirana ose Durrësi.',
  'workerProfile.location.verifiedBadge': 'E verifikuar',
  'workerProfile.location.fieldLabel': 'Qyteti ose zona',
  'workerProfile.location.hint': 'Ndryshimi i kësaj rifreskon automatikisht listën e punëve dhe kalendarin.',
  'workerProfile.location.savedVerified': 'Vendndodhja u ruajt dhe u verifikua.',
  'workerProfile.location.savedUnverified': 'Vendndodhja u ruajt, por nuk arritëm ta verifikojmë si vend real.',
  'workerProfile.location.error': 'Vendndodhja nuk u ruajt dot. Provo përsëri.',
  'workerProfile.location.submit': 'Ruaj vendndodhjen',
  'workerProfile.location.submitting': 'Po ruhet vendndodhja…',

  'workerProfile.documents.title': 'CV dhe foto',
  'workerProfile.documents.body': 'Bizneset që shqyrtojnë aplikimet e tua mund t’i shohin këto.',
  'workerProfile.documents.cv.label': 'CV',
  'workerProfile.documents.cv.empty': 'Nuk është ngarkuar ende asnjë CV.',
  'workerProfile.documents.cv.uploadedOn': 'Ngarkuar më {date}',
  'workerProfile.documents.cv.upload': 'Ngarko CV',
  'workerProfile.documents.cv.replace': 'Zëvendëso CV-në',
  'workerProfile.documents.cv.download': 'Shkarko',
  'workerProfile.documents.cv.uploading': 'Po ngarkohet…',
  'workerProfile.documents.cv.hint': 'PDF, deri në 5MB.',
  'workerProfile.documents.cv.error': 'CV-ja nuk u ngarkua dot. Kontrollo skedarin dhe provo përsëri.',
  'workerProfile.documents.photo.label': 'Foto profili',
  'workerProfile.documents.photo.empty': 'Nuk është ngarkuar ende asnjë foto.',
  'workerProfile.documents.photo.upload': 'Ngarko foto',
  'workerProfile.documents.photo.replace': 'Ndrysho foton',
  'workerProfile.documents.photo.uploading': 'Po ngarkohet…',
  'workerProfile.documents.photo.hint': 'JPEG, PNG ose WebP, deri në 5MB.',
  'workerProfile.documents.photo.error': 'Foto nuk u ngarkua dot. Kontrollo skedarin dhe provo përsëri.',

  'workerProfile.preferences.title': 'Preferencat',
  'workerProfile.preferences.body': 'Tregoju bizneseve çfarë lloj pune dhe orari kërkon.',
  'workerProfile.preferences.fieldsLabel': 'Fushat e interesit',
  'workerProfile.preferences.fieldsPlaceholder': 'p.sh. Banakier',
  'workerProfile.preferences.fieldsAdd': 'Shto',
  'workerProfile.preferences.fieldsHint': 'Deri në 15. Shtyp Enter ose kliko Shto.',
  'workerProfile.preferences.fieldsEmpty': 'Nuk është shtuar ende asnjë fushë.',
  'workerProfile.preferences.removeField': 'Hiq {field}',
  'workerProfile.preferences.shiftsLabel': 'Turnet e preferuara',
  'workerProfile.preferences.shift.morning': 'Mëngjes',
  'workerProfile.preferences.shift.evening': 'Mbrëmje',
  'workerProfile.preferences.shift.customHours': 'Orar i personalizuar',
  'workerProfile.preferences.submit': 'Ruaj preferencat',
  'workerProfile.preferences.submitting': 'Po ruhet…',
  'workerProfile.preferences.saved': 'Preferencat u ruajtën.',
  'workerProfile.preferences.error': 'Preferencat nuk u ruajtën dot. Provo përsëri.',

  'workerProfile.verification.title': 'Verifikimi i identitetit',
  'workerProfile.verification.body': 'Verifiko identitetin tënd me një ID për të marrë një distinktiv të verifikuar.',
  'workerProfile.verification.start': 'Verifiko me ID',
  'workerProfile.verification.starting': 'Po niset…',
  'workerProfile.verification.error': 'Verifikimi nuk u nis dot. Provo përsëri.',
  'workerProfile.verification.pendingHint':
    'Përfundoje verifikimin në skedën e re. Kjo faqe do të përditësohet sapo të shqyrtohet.',
  'workerProfile.verification.refresh': 'Rifresko statusin',
  'workerProfile.verification.verifiedHint': 'Identiteti yt është i verifikuar.',
  'workerProfile.verification.rejectedHint': 'Verifikimi nuk pati sukses. Mund të provosh përsëri.',
}

export const dictionaries: Record<Language, Record<TranslationKey, string>> = {
  en,
  sq,
}
