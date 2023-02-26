// ==UserScript==
// @name         IG Crime and Bullets (Get Rich)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  none
// @author       Shane
// @match        https://*/*
// @grant        none
// ==/UserScript==

setTimeout(function () {
	if (location.href.indexOf('infamousgangsters.com/site.php')!=-1) {
		if (location.origin.indexOf('www')!=-1) {
			var onPage = location.href.replace(location.origin, '').replace('https://', '').replace('http://', '').replace('/site.php?', '');
			console.log(onPage);
			if (onPage != 'page=jail&' && onPage != 'page=jail&&') {
				function navigate(to) {
					location.href = to;
					clearInterval(AJAXpageCheck);
				}
				var onStartPage = (onPage == "page=jail&&&");
				var response = document.body.innerHTML;
				var reloading = false;
				clearInterval(AJAXpageCheck);
				var AJAXpageCheck = undefined;
				if (!onStartPage) {
					AJAXpageCheck = setInterval(function () {
							var xhr = new XMLHttpRequest();
							xhr.onreadystatechange = function () {
								if (xhr.readyState == XMLHttpRequest.DONE) {
									if (inJail(false) && (!onStartPage)) {
										response = xhr.responseText;
										if (!inJail(false)) {
											reloading = true;
											navigate('https://www.infamousgangsters.com' + '/site.php?page=crimes');
										}
									} else {
										clearInterval(AJAXpageCheck);
									}
								}
							};
							xhr.open('GET', location.href, true);
							xhr.send(null);
						}, 1000);
				}
				var carMelt = {};
				carMelt.options = ['Volvo S60', 'Volvo 440 GL', 'Ford focus 2015', 'Ford focus', 'Fiat Punto', 'Fiat 500 Abarth', 'Volkswagen Golf', 'Volkswagen Golf cabrio', 'Porsche 911', 'Porsche 911 cabrio',
					'Volkswagen Golf III', 'Volkswagen Golf III GTI', 'VW Polo', 'VW Passat', 'Renault Megane R.S', 'Renault Clio Sport', 'Alfa Romeo GT', 'Alfa Romeo 33 Stradale',
					'Audi TT', 'Audi A8', 'Lamborghini Miura', 'Lamborghini Gallardo', 'Porsche Carrera 4S', 'Porsche Carrera GT', 'Ferrari GTO 250', 'Ferrari Enzo'];
				carMelt.toMelt = [];
				if (typeof localStorage.InfamousGangsters_meltCarsStr != 'undefined')
					carMelt.toMelt = localStorage.InfamousGangsters_meltCarsStr.split(',');
				if (carMelt.toMelt[0] == '')
					carMelt.toMelt = [];
				if (onStartPage) {
					localStorage.InfamousGangsters_next = '';
					var checks = [];
					document.head.innerHTML = '';
					document.body.innerHTML = '';
					document.title = 'Bot Options';
					document.body.innerHTML += "<center><h3>disclaimer: burns cars with these names and burns those of which nearest to the top of the melting page (usually higher value first)<br>";
					var count = 0;
					for (; count < carMelt.options.length; count++) {
						var car = carMelt.options[count];
						document.body.innerHTML += '<input type="checkbox" value="' + car + '"> ' + car + '<br>';
					}
					document.body.innerHTML += '<center><input type="button" id="uncheckall" value="Uncheck All"> <input type="button" id="checkall" value="Check All">';
					document.body.innerHTML += "<center><h3>disclaimer: burns cars with these names and burns those of which nearest to the top of the melting page (usually higher value first)<br>";
					count = 0;
					document.body.innerHTML += '<center><input type="button" id="start" value="Start">';
					var checkboxes = document.querySelectorAll('input[type=checkbox]');
					for (; count < 20; count++)
						checkboxes[count].checked = true;
					localStorage.InfamousGangsters_meltCarsStr = '';
					var cycleCheckboxes = function (setValue) {
						count = 0;
						for (; count < checkboxes.length; count++)
							checkboxes[count].checked = setValue;
					};
					document.getElementById('checkall').onclick = cycleCheckboxes.bind(this, true);
					document.getElementById('uncheckall').onclick = cycleCheckboxes.bind(this, false);
					document.getElementById('start').onclick = function () {
						count = 0;
						for (; count < checkboxes.length; count++) {
							if (checkboxes[count].checked)
								localStorage.InfamousGangsters_meltCarsStr += checkboxes[count].value + ',';
						}
						localStorage.InfamousGangsters_meltCarsStr = localStorage.InfamousGangsters_meltCarsStr.substr(0, localStorage.InfamousGangsters_meltCarsStr.length - 1);
						console.log(localStorage.InfamousGangsters_meltCarsStr);
						navigate('https://www.infamousgangsters.com' + '/site.php?page=crimes');
					};
				}
				var temp = localStorage.InfamousGangsters_next;
				if (localStorage.InfamousGangsters_next != '') {
					localStorage.InfamousGangsters_next = '';
					navigate('https://www.infamousgangsters.com' + '/site.php?' + temp);
				}
				function inJail(reload) {
					if (response.indexOf('<strong>*</strong>') != -1) {
						if (response.indexOf('.countdown') != -1) {
							if (reload) {
								if (document.body.innerHTML.indexOf('<td class="header" colspan="3"><div align="center" class="unnamed1">Jail</div></td>') != -1) {
									var wait = 0;
									wait = document.querySelector('.countdown').textContent * 1000;
									setTimeout(function () {
										navigate('https://www.infamousgangsters.com' + '/site.php?page=crimes');
									}, wait);
								}
							}
							return true;
						}
					}
					if (response.indexOf('<div class="spacer">You are in jail!<div class="helpbox" id="helpbox">') != -1 || response.indexOf('You are now in jail too!<div class="helpbox" id="helpbox">') != -1) {
						if (reload) {
							if (document.body.innerHTML.indexOf('<td class="header" colspan="3"><div align="center" class="unnamed1">Jail</div></td>') != -1) {
								setTimeout(function () {
									if (!reloading)
										navigate('https://www.infamousgangsters.com' + '/site.php?page=crimes');
								}, 5100);
							}
						}
						return true;
					}
					return false;
				}
				if (!inJail(!onStartPage) && temp == '') {
					switch (onPage) {
					case '':
					case 'page=jail&':
					case 'page=jail&&':
					case 'page=jail&&&':
						break;
					case 'page=crimes':
						if (document.body.innerHTML.indexOf('You have been caught trying to commit a crime! You are now in <b>jail!</b>') != -1) {
							navigate('https://www.infamousgangsters.com' + '/site.php?page=crimes');
							break;
						}
						var unnamed1_elms = document.getElementsByClassName('unnamed1');
						var unnamed1_num = unnamed1_elms.length;
						var GTA_timer = unnamed1_elms[unnamed1_num - 3].textContent;
						var Melting_timer = unnamed1_elms[unnamed1_num - 1].textContent;
						if (GTA_timer.indexOf('Available!') != -1) {
							localStorage.InfamousGangsters_MeltingGTA = false;
							if (Melting_timer.indexOf('Available!') != -1 && carMelt.toMelt.length > 0)
								localStorage.InfamousGangsters_MeltingGTA = true;
							navigate('https://www.infamousgangsters.com' + '/site.php?page=gta');
							break;
						} else {
							if (Melting_timer.indexOf('Available!') != -1 && localStorage.InfamousGangsters_melt != 'false' && carMelt.toMelt.length > 0) {
								navigate('https://www.infamousgangsters.com' + '/site.php?page=bullets');
								break;
							}
						}
						var wait = 0;
						var counter2 = document.querySelector('#counter2');
						var counter5 = document.querySelector('#counter5');
						if (counter2 != null) {
							wait = counter2.textContent * 1000;
							GTA_timer = GTA_timer.replace('seconds!', '');
							GTA_timer.trim();
							GTA_timer = GTA_timer.replace('Wait ', '');
							GTA_timer *= 1000;
							Melting_timer = Melting_timer.replace('seconds!', '');
							Melting_timer.trim();
							Melting_timer = Melting_timer.replace('Wait ', '');
							Melting_timer *= 1000;
							if (counter5 != null && document.body.innerHTML.indexOf('<span id="counter5" style="visibility:hidden ">0</span><font color="darkred">unavailable</font>') == -1) {
								var counter5ms = Number(counter5.textContent) * 1000;
								if (counter5ms < wait)
									wait = counter5ms;
							}
							if (GTA_timer < wait)
								wait = GTA_timer;
							if (Melting_timer < wait && localStorage.InfamousGangsters_melt != 'false')
								wait = Melting_timer;
						}
						setTimeout(function () {
							var inputs = document.getElementsByTagName('input');
							var boxnum = 0;
							for (var x = 0; x < inputs.length; x++) {
								if (inputs[x].name != 'hhhh[]') {
									boxnum++;
									if (boxnum != 1 && boxnum != 6)
										inputs[x].click();
								}
							}
						}, wait);
						break;
					case 'page=gta':
						if (document.body.innerHTML.indexOf('You have been caught trying to commit a crime! You are now in <b>jail!</b>') != -1) {
							location.href = 'https://www.infamousgangsters.com' + '/site.php?page=crimes';
							break;
						}
						localStorage.InfamousGangsters_next = 'page=crimes';
						if (localStorage.InfamousGangsters_MeltingGTA == 'true' && localStorage.InfamousGangsters_melt != 'false')
							localStorage.InfamousGangsters_next = 'page=bullets';
						var buttons = document.getElementsByClassName('tbox');
						for (var x = 0; x < buttons.length; x++) {
							if (buttons[x].value == 'Steal a car!') {
								localStorage.InfamousGangsters_melt = true;
								buttons[x].click();
								break;
							}
						}
						break;
					case 'page=bullets':
						localStorage.InfamousGangsters_next = 'page=crimes';
						var rows = document.getElementsByTagName('tbody')[8].getElementsByTagName('tr');
						var buttons = document.getElementsByClassName('tbox');
						var select = 0;
						var toBreak = false;
						if (rows.length > 1 && carMelt.toMelt.length > 0) {
							select++;
							for (; select < rows.length; select++) {
								var row = rows[select];
								var textParent = row.children[0].children[1];
								var potText = textParent.children[1];
								for (var check=carMelt.toMelt.length-1;check>=0;check--) {
									var compare = textParent.children[0].textContent;
									if (typeof potText != 'undefined') {
										compare = potText.textContent.replace(': ', '');
									}
									if (compare == carMelt.toMelt[check]) {
										row.children[0].children[0].click();
										for (var y = 0; y < buttons.length; y++) {
											if (buttons[y].value == 'Melt car!') {
												buttons[y].click();
												break;
											}
										}
										toBreak = true;
										break;
									}
								}
								if (toBreak)
									break;
							}
						}
						if (toBreak)
							break;
						localStorage.InfamousGangsters_next = '';
						if (!(carMelt.toMelt.length > 0)) {
							navigate('https://www.infamousgangsters.com' + '/site.php?page=crimes');
							toBreak = true;
							break;
						}
						if (select != 0) {
							for (var z = 0; z < buttons.length; z++) {
								if (buttons[z].value == 'Next page!' && select >= 5) {
									buttons[z].click();
									toBreak = true;
									break;
								} else {
									if (z == buttons.length - 1) {
										localStorage.InfamousGangsters_melt = false;
										navigate('https://www.infamousgangsters.com' + '/site.php?page=crimes');
										toBreak = true;
										break;
									}
								}
							}
						}
						if (toBreak)
							break;
						localStorage.InfamousGangsters_melt = false;
					default:
						navigate('https://www.infamousgangsters.com' + '/site.php?page=crimes');
					}
				}
			}
	    } else {
			localStorage.clear();
			location.href = location.href.replace('infamousgangsters.com','www.infamousgangsters.com');
		}
	}
}, 1);
