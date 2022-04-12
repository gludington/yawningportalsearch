(function () {
    var createForm = () => {
        if (document.getElementById('upcoming-events-container')) {
            if (document.getElementById('_eventSearchForm') === null) {

                var createSelect = (options) => {
                    var select = document.createElement('select');
                    var none = document.createElement('option');
                    none.value = '';
                    none.innerText = 'Any';
                    select.appendChild(none);
                    options.forEach(option => {
                        var opt = document.createElement('option');
                        opt.value = option;
                        opt.innerText = option;
                        select.appendChild(opt)
                    });
                    return select;
                }

                var vttStrings = /.*(roll20|foundry|zoom|discord|owlbear|fantasy grounds).*/i;
                var tzRegex = /GMT/;
                var _evtList = document.getElementsByClassName('event-list')[0];
                var _evtEvents = Array.from(_evtList.children);
                // a map to dedupe titles to build a search widget
                var titles = {};
                // a map to dedupe titles to build a vtt widget
                var vtts = {};
                // a map to dedupe start times to build a start time widget
                var starts = {};
                // a map to dedupe campaigns
                var campaigns = {};
                _evtEvents.forEach(evt => {
                    // sold out games have the text SOLD OUT in them
                    evt._soldOut = evt.innerHTML.indexOf("SOLD OUT") > -1;
                    // the title block is dash delimited, e.g. 
                    // [SOLD OUT] Table #7 - Introduction to Wildemount - Frozen Sick - Roll20/Zoom
                    // [(sold out)? Table, Title, Vtt ]
                    var title;
                    var t2 = evt.getElementsByTagName('h4');
                    if (t2.length === 1) {
                        title = t2[0].textContent;
                    } else {
                         title = evt.children[0].children[0].children[0].children[1].children[1].textContent;
                    }

                    if (title) {
                        var meta = title.split('-');
                        // here is where it gets complicated, because some titles have dashes in them, and some have words that correspond to vtts
                        var titleArr = [];
                        var vttArr = [];
                        // work backwards until we find 
                        var foundVtt = false;
                        for (var idx = meta.length - 1; idx > 0; idx--) {
                            if (foundVtt == false) {
                                vttArr.unshift(meta[idx]);
                                if (vttStrings.test(meta[idx])) {
                                    foundVtt = true;
                                }
                            } else {
                                titleArr.unshift(meta[idx].trim());
                            }
                        }

                        var gameTitle = titleArr.length === 1 ? titleArr[0] : titleArr.join(' - ');
                        var vtt = vttArr.join(' - ');

                        titles[gameTitle] = 1;
                        evt._gameTitle = gameTitle;
            
                        vtts[vtt] = 1;
                        evt._vtt = vtt;
                    }
                    var data = Array.from(evt.getElementsByClassName('MuiChip-label'));
                    var day;
                    var time;
                    if (data.length === 0) {
                        var dataDivs = evt.getElementsByClassName('react-tags-root');
                        if (dataDivs.length > 0) {
                            var dataDiv = dataDivs[0];
                            var dataStr = dataDiv.getAttribute('data-tags');
                            var dataTags = dataStr.split(',');
                            for (var dt of dataTags) {
                                if (dt.indexOf('AL') == -1) {
                                    if (tzRegex.test(dt)) {
                                        time = dt;
                                    } else {
                                        day = dt;
                                    }
                                } else {
                                    evt._campaign = dt;
                                    campaigns[dt] = 1;
                                }
                            }
                        }
                    } else {
                        data.forEach(d => {
                            //a node with AL in it describes the campaign
                            if (d.textContent.indexOf('AL') == -1) {
                                if (tzRegex.test(d.textContent)) {
                                    time = d.textContent;
                                } else {
                                    day = d.textContent;
                                }
                            } else {
                                evt._campaign = d.textContent;
                                campaigns[d.textContent] = 1;
                            }
                        });
                    }
                    var start = day + ' ' + time;
                    starts[start] = 1;
                    evt._start = start;
                })

                var _evtSearchFn = () => {
                    const searchText = _evtSearch.value.toLowerCase();
                    const name = _nameFilter.options[_nameFilter.selectedIndex].value;
                    const vtt = _vttFilter.options[_vttFilter.selectedIndex].value;
                    const start = _startFilter.options[_startFilter.selectedIndex].value;
                    const campaign = _campaignFilter.options[_campaignFilter.selectedIndex].value;
                    const hideChecked = _evtToggleSoldOut.checked;
                    _evtEvents.forEach(ele => {
                        if (!(searchText === '' || ele.innerHTML.toLowerCase().indexOf(searchText) > -1)
                            || (hideChecked === true && ele._soldOut === true)
                            || (!(name === '' || ele._gameTitle === name))
                            || (!(start === '' || ele._start === start))
                            || (!(vtt === '' || ele._vtt === vtt))
                            || (!(campaign === '' || ele._campaign === campaign))) {
                            ele.style.display = 'none';
                        } else {
                            ele.style.display = 'block';
                        }
                    })
                }
                titles = Object.keys(titles).sort();
                vtts = Object.keys(vtts).sort();
                starts = Object.keys(starts);//dont sort because they are in order
                campaigns = Object.keys(campaigns).sort();
                
                var _evtForm = document.createElement('div');
                _evtForm.id = '_eventSearchForm';
                var _nameLabel = document.createElement('label');
                _nameLabel.for = '_nameFilter';
                _nameLabel.innerHTML = '<b>Game: </b>';
                _evtForm.appendChild(_nameLabel);
                var _nameFilter = createSelect(titles);
                _nameFilter.onchange = _evtSearchFn;
                _evtForm.appendChild(_nameFilter);
                var _startLabel = document.createElement('label');
                _startLabel.for = '_startFilter';
                _startLabel.innerHTML = '<b>Starting: </b>';
                _evtForm.appendChild(_startLabel);
                var _startFilter = createSelect(starts);
                _startFilter.onchange = _evtSearchFn;
                _evtForm.appendChild(_startFilter);
                var _vttLabel = document.createElement('label');
                _vttLabel.for = '_vttFilter';
                _vttLabel.innerHTML = '<b>VTT: </b>';
                _evtForm.appendChild(_vttLabel);
                var _vttFilter = createSelect(vtts);
                _vttFilter.onchange = _evtSearchFn;
                _evtForm.appendChild(_vttFilter);
                var _campaignLabel = document.createElement('label');
                _campaignLabel.for = '_campaignFilter';
                _campaignLabel.innerHTML = '<b>Campaign: </b>';
                _evtForm.appendChild(_campaignLabel);
                var _campaignFilter = createSelect(campaigns);
                _campaignFilter.onchange = _evtSearchFn;
                _evtForm.appendChild(_campaignFilter);
                var _evtToggleSoldOut = document.createElement('input');
                _evtToggleSoldOut.id = '_evtToggleSoldOut';
                _evtToggleSoldOut.type = 'checkbox';
                var _evtSoldOutLabel = document.createElement('label');
                _evtSoldOutLabel.innerHTML = '<b>Hide Sold Out: </b>';
                _evtSoldOutLabel.for = '_evtToggleSoldOut';
                _evtToggleSoldOut.addEventListener('change', _evtSearchFn);
                _evtForm.appendChild(_evtSoldOutLabel);
                _evtForm.appendChild(_evtToggleSoldOut);
                _evtForm.appendChild(document.createElement('br'))
                var _evtSearch = document.createElement('input');
                _evtSearch.id = '_eventSearchText';
                var _evtSearchLabel = document.createElement('label');
                _evtSearchLabel.for = '_eventSearchText';
                _evtSearchLabel.innerHTML = '<b>Full Text Search: </b>';
                _evtSearch.addEventListener('input', _evtSearchFn);
                _evtForm.appendChild(_evtSearchLabel);
                _evtForm.appendChild(_evtSearch);
                var _version = document.createElement('span');
                _version.innerHTML = '&nbsp;&nbsp<a href="@@HOMEPAGE@@">YP Search Bookmarklet</a>, V@@VERSION@@';
                _evtForm.appendChild(_version);

                _evtList.parentNode.insertBefore(_evtForm, _evtList);
        
            }
        }
    };
    // if we run this on a timeout, we can go back to the old way of parsing the div, because the post-react
    // divs will be present
    window.setTimeout(createForm, 0);
})();