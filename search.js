(function () {
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

var _evtList = document.getElementsByClassName('event-list')[0];  
        var _evtEvents = Array.from(_evtList.children);
        var titles = {};
        var vtts = {};
        var starts = {};
_evtEvents.forEach(evt => {
    
    var title = evt.children[0].children[0].children[0].children[1].children[1].textContent;
    if (title) {
        var meta = title.split(' - ');
        var title = meta[1];
        titles[title] = 1;
            evt._gameTitle = title;
        var vtt;
        if (meta.length === 4) {
            vtt = meta[2] + ' - ' + meta[3];
        } else {
            vtt = meta[2];
        }
        vtts[vtt] = 1;
        evt._vtt = vtt;
    }
    var data = Array.from(evt.getElementsByClassName('MuiChip-label'));
    var day;
    var time;
    data.forEach(d => {
        if (d.textContent.indexOf('AL') == -1) {
            
            if (d.textContent.indexOf('day') > -1) {
                day = d.textContent;
            } else {
                time = d.textContent;
            }
        }
    });
    var start = day + ' ' + time;
    starts[start] = 1;
    evt._start = start;
})

var _evtSearchFn = () => {
    const searchText = _evtSearch.value.toLowerCase();
    const name = _nameFilter.options[_nameFilter.selectedIndex].value;
    const vtt = _vttFilter.options[_vttFilter.selectedIndex].value;
    const start = _startFilter.options[_startFilter.selectedIndex].value;
    const hideChecked = _evtToggleSoldOut.checked;
        _evtEvents.forEach(ele => {
        if (!(searchText === '' || ele.innerHTML.toLowerCase().indexOf(searchText) > -1)
            || (hideChecked === true && ele.innerHTML.indexOf('SOLD OUT') > -1)
            || (!(name === '' || ele._gameTitle === name))
            || (!(start === '' || ele._start === start))
            || (!(vtt === '' || ele._vtt === vtt))) {
        ele.style.display='none';
        } else {
        ele.style.display='block';
        }
    })  
}
        titles = Object.keys(titles).sort();
        vtts = Object.keys(vtts).sort();
        starts = Object.keys(starts);//dont sort because they are in order
var _evtForm = document.createElement('div');
        _evtForm.id = '_eventSearchForm';
        var _nameLabel = document.createElement('label');
        _nameLabel.for='_nameFilter';
        _nameLabel.innerHTML = '<b>Game: </b>';
        _evtForm.appendChild(_nameLabel);
        var _nameFilter = createSelect(titles);
        _nameFilter.onchange = _evtSearchFn;
        _evtForm.appendChild(_nameFilter);
        var _startLabel = document.createElement('label');
        _startLabel.for='_startFilter';
        _startLabel.innerHTML = '<b>Starting: </b>';
        _evtForm.appendChild(_startLabel);
        var _startFilter = createSelect(starts);
        _startFilter.onchange = _evtSearchFn;
        _evtForm.appendChild(_startFilter);
        var _vttLabel = document.createElement('label');
        _vttLabel.for='_vttFilter';
        _vttLabel.innerHTML = '<b>VTT: </b>';
        _evtForm.appendChild(_vttLabel);
        var _vttFilter = createSelect(vtts);
        _vttFilter.onchange = _evtSearchFn;
        _evtForm.appendChild(_vttFilter);
                var _evtToggleSoldOut = document.createElement('input');
_evtToggleSoldOut.id='_evtToggleSoldOut';  
_evtToggleSoldOut.type='checkbox';
var _evtSoldOutLabel = document.createElement('label');
_evtSoldOutLabel.innerHTML='<b>Hide Sold Out: </b>';
_evtSoldOutLabel.for='_evtToggleSoldOut';
_evtToggleSoldOut.addEventListener('change', _evtSearchFn);
_evtForm.appendChild(_evtSoldOutLabel);
_evtForm.appendChild(_evtToggleSoldOut);
        _evtForm.appendChild(document.createElement('br'))
var _evtSearch = document.createElement('input');
_evtSearch.id='_eventSearchText';
var _evtSearchLabel = document.createElement('label');
_evtSearchLabel.for='_eventSearchText';
_evtSearchLabel.innerHTML='<b>Full Text Search: </b>';
_evtSearch.addEventListener('input', _evtSearchFn);
_evtForm.appendChild(_evtSearchLabel);
        _evtForm.appendChild(_evtSearch);
                var _version = document.createElement('span');
        _version.innerHTML ='&nbsp;&nbsp<a href="https://github.com/gludington/yawningportalsearch">YP Search Bookmarklet</a>, V1.0';
        _evtForm.appendChild(_version);

    _evtList.parentNode.insertBefore(_evtForm, _evtList);
    
}})();