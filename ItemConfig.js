class ItemConfig {
	
	constructor(context) {
		this.context=context;
	}
	
	init() {
		let context=this.context;
		
		context.gameItemComponentsList = [];
		var aluminium = 	new ItemComponent("aluminum",	"raw_res_aluminum.png",		"Metal",	7,	"Aluminium");
		var batteryLit = 	new ItemComponent("batteryLit",	"raw_res_batteryLit.png",	"Battery",	5,	"Bateria litowo jonowa");
		var batteryNik = 	new ItemComponent("batteryNik",	"raw_res_batteryNik.png",	"Battery",	5,	"Bateria niklowo kadmowa");
		var brass = 		new ItemComponent("brass",		"raw_res_brass.png",		"Metal",	5,	"Mosiądz");
		var cadm = 			new ItemComponent("cadm",		"raw_res_cadm.png",			"Danger",	10,	"Kadm");
		var chrome = 		new ItemComponent("chrome",		"raw_res_chrome.png",		"Metal",	10,	"Chrom");
		var cobalt = 		new ItemComponent("cobalt",		"raw_res_cobalt.png",		"Metal",	10,	"Kobalt");
		var copper = 		new ItemComponent("copper",		"raw_res_copper.png",		"Metal",	7,	"Miedź");
		var glass = 		new ItemComponent("glass",		"raw_res_glass.png",		"Other",	5,	"Szkło");
		var gold = 			new ItemComponent("gold",		"raw_res_gold.png",			"Rich",		10,	"Złoto");
		var lead = 			new ItemComponent("lead",		"raw_res_lead.png",			"Danger",	10,	"Ołów");
		var nickel = 		new ItemComponent("nickel",		"raw_res_nickel.png",		"Metal",	10,	"Nikiel");
		var plastic = 		new ItemComponent("plastic",	"raw_res_plastic.png",		"Other",	3,	"Plastik");
		var platinium = 	new ItemComponent("platinium",	"raw_res_platinium.png",	"Rich",		10,	"Platyna");
		var ree = 			new ItemComponent("ree",		"raw_res_ree.png",			"Metal",	10,	"Metale ziem rzadkich");
		var refrigerant = 	new ItemComponent("refrigerant","raw_res_refrigerant.png",	"Other",	5,	"Chłodziwo");
		var silver = 		new ItemComponent("silver",		"raw_res_silver.png",		"Rich",		10,	"Srebro");
		var steel = 		new ItemComponent("steel",		"raw_res_steel.png",		"Metal",	5,	"Stal");
		var tin = 			new ItemComponent("tin",		"raw_res_tin.png",			"Metal",	5,	"Cyna");
		var wolfram = 		new ItemComponent("wolfram",	"raw_res_wolfram.png",		"Rich",		8,	"Wolfram");
		var mercury = 		new ItemComponent("mercury",	"raw_res_mercury.png",		"Danger",	10,	"Rtęć");
		
		aluminium.addMineCountry(countryName.AUSTRALIA);
		aluminium.addMineCountry(countryName.GWINEA);
		aluminium.addMineCountry(countryName.WENEZUELA);
		aluminium.desc = "Metal nieżelazny stosowany do obudowy urządzeń, ekranów i baterii, w termostatach, kondensatorach, bębnach pralek itp."
		
		batteryLit.desc = "Są różne rodzaje baterii. Mogą zawierać metale ciężkie szkodliwe dla zdrowia takie jak kadm (Cd) i nikiel (Ni) Akumulatorki niklowo-kadmowe: Ni-Cd, w postaci paluszków AA, stosowane mogą być w różnych urządzeniach przenośnych np. małych radiach, bo można je ładować wielokrotnie. Do wkrętarek, telefonów, aparatów fotograficznych itp., masowo produkowane są inne baterie: nowszej generacji akumulatory litowo – jonowe typu (Li-Ion), w których katody wykonane są z tlenku kobaltu ( CoO2)."
		
		batteryNik.desc = batteryLit.desc;
		
		brass.desc = "Stop miedzi i cynku, o wysokiej odporności na korozję.";
		
		cadm.addMineCountry(countryName.CHINY);
		cadm.addMineCountry(countryName.KANADA);
		cadm.addMineCountry(countryName.POLSKA);
		cadm.desc = "Kadm jest bardzo toksycznym pierwiastkiem. Gdy dostanie się do organizmu, po spożyciu lub wdychaniu, przenika do krwi i gromadzi się w wątrobie, a także powoduje zaburzenia czynności nerek. Jest bardzo zbliżony do wapnia i jako taki może wchodzić w interakcje z wapniem w kościach. Ulega bioakumulacji w organizmach żywych.Stosowany w metalurgii, używany w stopach do przewodów elektrycznych i bezpieczników, a także w produkcji baterii akumulatorowych (na przykład baterii niklowo-kadmowych)";
		
		chrome.desc = "";
		
		cobalt.addMineCountry(countryName.AUSTRALIA);
		cobalt.addMineCountry(countryName.KONGO);
		cobalt.addMineCountry(countryName.KUBA);
		cobalt.desc = "";
		
		copper.addMineCountry(countryName.CHILE);
		copper.addMineCountry(countryName.POLSKA);
		copper.addMineCountry(countryName.ZAMBIA);
		copper.desc = "Znana od starożytności, dzisiaj używana do produkcji silników i kabli, procesorów, półprzewodników oraz płytek obwodów drukowanych do urządzeń AGD i RTV.";
		
		glass.desc = "Materiał nieorganiczny otrzymywany z piasku kwarcowego i dodatków takich jak np węglan sodu lub węglan wapnia oraz topników i pigmentów. Wszystkie te surowce ogrzewane są do bardzo wysokiej temperatury ok. 1700 stopni C i schładzane do stanu stałego bez krystalizacji.";
		
		gold.addMineCountry(countryName.POLSKA);
		gold.addMineCountry(countryName.RPA);
		gold.addMineCountry(countryName.USA);
		gold.desc = "Metal szlachetny stosowany w elektronice ze względu na swoją odporność na działanie czynników atmosferycznych, np.: do powlekania procesorów, styków kabli, chipów i innych elementów PC.";
		
		lead.addMineCountry(countryName.CHINY);
		lead.addMineCountry(countryName.AUSTRALIA);
		lead.addMineCountry(countryName.PERU);
		lead.desc = "Związki ołowiu działają szkodliwie przez drogi oddechowe i  po połknięciu. Są szkodliwie dla dziecka w łonie matki. Niebezpieczeństwo kumulacji w organizmie i chorób neurologicznych. Mogą powodować długo utrzymujące się niekorzystne zmiany w środowisku wodnym i przenikać do sieci troficznej ryb i ptaków żywiących się organizmami wodnymi. Ulega bioakumulacji w organizmach żywych. Używany w akumulatorach, a także w postaci blach, rur, stopów, śrutu i w produkcji szkła, do powłok kabli elektrycznych czy osłony przed promieniowaniem jonizującym.";
		
		nickel.addMineCountry(countryName.KANADA);
		nickel.addMineCountry(countryName.KUBA);
		nickel.addMineCountry(countryName.ROSJA);
		nickel.desc = "";
		
		plastic.desc = "Tworzywa sztuczne mają bardzo różne cechy i właściwości: w urządzeniach AGD i RTV spotykamy m.in. poliwęglany ( PC) lub polistyren (HIPS) do obudowy urządzeń, giętka guma do obudowy kabli (PVC), polietylen lub polipropylen do produkcji zabawek i części o precyzyjnych kształtach, folie. Tworzywa mogą zawierać domieszki substancji groźnych dla zdrowia.";
		
		platinium.addMineCountry(countryName.KANADA);
		platinium.addMineCountry(countryName.ROSJA);
		platinium.addMineCountry(countryName.RPA);
		platinium.desc = "Metal szlachetny, używany do podzespołów dysku twardego komputera, anten telefonów komórkowych czy napędu CD-DVD."
		
		ree.addMineCountry(countryName.CHINY);
		ree.desc = "O szerokich perspektywach wykorzystania w energetyce odnawialnej i motoryzacji, dlatego nazywane metalami przyszłości. W elektronice stosowany w wyświetlaczach urządzeń.";
		
		refrigerant.desc = "Pierwszym chłodziwem stosowanym na szeroką skalę w lodówkach był freon 12, związek chlorofluorowęglowodoru (nazywany także CFC, CCl2F2). Ze względu na szkodliwy wpływ na warstwę ozonową, freony zastąpiono fluorowęglowodorami ( w skrócie HFC ). W trakcie demontażu urządzenia do recyklingu, gaz chłodzący jest oddzielony w bezpieczny sposób i nie wydostaje się do powietrza.";
		
		silver.addMineCountry(countryName.MEKSYK);
		silver.addMineCountry(countryName.PERU);
		silver.addMineCountry(countryName.POLSKA);
		silver.desc = "Metal szlachetny, używany od starożytności, w elektronice stosowany ze względu na większą trwałość od cyny.";
		
		steel.addMineCountry(countryName.CHINY);
		steel.addMineCountry(countryName.INDIE);
		steel.addMineCountry(countryName.JAPONIA);
		steel.desc = "Stop żelaza z węglem, zawiera zazwyczaj także inne składniki; jest wiele rodzajów stali o bardzo różnych właściwościach. Ze stali wykonuje się elementy konstrukcyjne i mocujące wielu urządzeń, a także magnesy czy śruby.";
		
		tin.addMineCountry(countryName.BOLIWIA);
		tin.addMineCountry(countryName.BRAZYLIA);
		tin.addMineCountry(countryName.INDONEZJA);
		tin.desc = "Znana od starożytności, wyrabiano z niej cynowe naczynia w Średniowieczu, dzisiaj jest podstawowym metalem używanym do stopów na płytach drukowanych: w stopach bezołowiowych do cyny dodawane są niewielkie ilości srebra lub miedzi.";
		
		wolfram.addMineCountry(countryName.AUSTRALIA);
		wolfram.addMineCountry(countryName.AUSTRIA);
		wolfram.addMineCountry(countryName.KOREA);
		wolfram.desc = "Inaczej tungsten. Metal bardzo ważny dla przemysłu zbrojeniowego, a cienki drucik wolframu znajdujący się w bańce żarówki, powoduje, że żarówka świeci.";
		
		mercury.addMineCountry(countryName.CHINY);
		mercury.addMineCountry(countryName.CHILE);
		mercury.addMineCountry(countryName.ROSJA);
		mercury.desc = "Rtęć jest toksyczna we wszystkich formach organicznych i we wszystkich stanach chemicznych. W postaci pary rtęć jest toksyczna dla dróg oddechowych i rozpuszcza się we krwi; atakuje nerki, mózg i układ nerwowy. Bardzo groźna dla kobiet w ciąży i dla płodu. Ulega bioakumulacji w organizmach żywych. Była ceniona w medycynie ( w termometrach) i technice dentystycznej ( amalgamaty). Lampy rtęciowe szeroko stosowane były w oświetleniu zewnętrznym, hal przemysłowych oraz magazynów, a także w kineskopach starych telewizorów.";
		
		context.gameItemComponentsList.push(aluminium,batteryLit,batteryNik,brass,cadm,chrome,cobalt,copper,glass,gold,lead,nickel,plastic,platinium,ree,refrigerant,silver,steel,tin,wolfram,mercury);
		
		context.gameSortItemList = [];
		var calculator = new SortItem("calculator","item_calculator_big.png","Kalkulator",true);
			calculator.addComponent(copper,15);
			calculator.addComponent(batteryNik,20);
			calculator.addComponent(plastic,65);
		
		var car = new SortItem("car","item_car.png","Zabawka",true);
			car.addComponent(copper,15);
			car.addComponent(batteryNik,20);
			car.addComponent(plastic,65);
		
		var kettle = new SortItem("kettle","item_kettle.png","Czajnik");
			kettle.addComponent(steel,5);
			kettle.addComponent(copper,15);
			kettle.addComponent(plastic,80);
			
		var lamp = new SortItem("lamp","item_lamp.png","Lampa");
			lamp.addComponent(wolfram,1);
			lamp.addComponent(aluminium,1);
			lamp.addComponent(steel,2);
			lamp.addComponent(glass,5);
			lamp.addComponent(copper,15);
			lamp.addComponent(plastic,75);
			
		var mixer = new SortItem("mixer","item_mixer.png","Mikser");
			mixer.addComponent(aluminium,10);
			mixer.addComponent(steel,15);
			mixer.addComponent(copper,15);
			mixer.addComponent(plastic,60);
			
		var mobile = new SortItem("mobile","item_mobile_big.png","Telefon komórkowy",true);
			mobile.addComponent(steel,2);
			mobile.addComponent(silver,2);
			mobile.addComponent(gold,2);
			mobile.addComponent(platinium,3);
			mobile.addComponent(aluminium,5);
			mobile.addComponent(tin,5);
			mobile.addComponent(copper,15);
			mobile.addComponent(batteryLit,20);
			mobile.addComponent(plastic,35);
			
		var owen = new SortItem("owen","item_owen.png","Kuchenka");
			owen.addComponent(brass,10);
			owen.addComponent(aluminium,10);
			owen.addComponent(copper,15);
			owen.addComponent(plastic,20);
			owen.addComponent(steel,45);
			
		var pc = new SortItem("pc","item_pc.png","Komputer");
			pc.addComponent(silver,2);
			pc.addComponent(gold,2);
			pc.addComponent(platinium,2);
			pc.addComponent(tin,5);
			pc.addComponent(aluminium,6);
			pc.addComponent(copper,15);
			pc.addComponent(plastic,15);
			pc.addComponent(steel,25);
			
		var radio = new SortItem("radio","item_radio.png","Radio",true);
			radio.addComponent(steel,5);
			radio.addComponent(aluminium,5);
			radio.addComponent(copper,15);
			radio.addComponent(batteryNik,20);
			radio.addComponent(plastic,55);
		
		var refrigerator = new SortItem("refrigerator","item_refrigerator.png","Lodówka",false,true);
			refrigerator.addComponent(refrigerant,5);
			refrigerator.addComponent(aluminium,5);
			refrigerator.addComponent(copper,15);
			refrigerator.addComponent(steel,20);
			refrigerator.addComponent(plastic,55);
		
		var shaver = new SortItem("shaver","item_shaver.png","Golarka",true);
			shaver.addComponent(steel,5);
			shaver.addComponent(aluminium,5);
			shaver.addComponent(copper,15);
			shaver.addComponent(batteryNik,20);
			shaver.addComponent(plastic,55);
			
		var smartphone = new SortItem("smartphone","item_smartphone.png","Smartfon",true);
			smartphone.addComponent(ree,1);
			smartphone.addComponent(steel,2);
			smartphone.addComponent(silver,2);
			smartphone.addComponent(gold,2);
			smartphone.addComponent(platinium,3);
			smartphone.addComponent(aluminium,5)
			smartphone.addComponent(tin,5);
			smartphone.addComponent(glass,10);
			smartphone.addComponent(copper,15);
			smartphone.addComponent(batteryLit,20);
			smartphone.addComponent(plastic,35);
			
		var tvNEW = new SortItem("tvNEW","item_tvNEW.png","Telewizor");
			tvNEW.addComponent(ree,5);
			tvNEW.addComponent(tin,5);
			tvNEW.addComponent(steel,15);
			tvNEW.addComponent(copper,15);
			tvNEW.addComponent(plastic,30);
			tvNEW.addComponent(glass,30);
			
		var tvOLD = new SortItem("tvOLD","item_tvOLD.png","Stary telewizor");
			tvOLD.addComponent(mercury,1);
			tvOLD.addComponent(cadm,1);
			tvOLD.addComponent(steel,4);
			tvOLD.addComponent(lead,9);
			tvOLD.addComponent(copper,15);
			tvOLD.addComponent(glass,30);
			tvOLD.addComponent(plastic,40);
			
		var washer = new SortItem("washer","item_washer.png","Pralka");
			washer.addComponent(copper,15);
			washer.addComponent(aluminium,20);
			washer.addComponent(steel,25);
			washer.addComponent(plastic,40);
			
		context.gameSortItemList.push(calculator,car,kettle,lamp,mixer,mobile,owen,pc,radio,refrigerator,shaver,smartphone,tvNEW,tvOLD,washer);
	}
};