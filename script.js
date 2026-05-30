$(document).ready(function() {

    $('#unmuteBtn').click(function() {
        const video = $('.video-background')[0];
        if (video) {
            if (video.muted) {
                video.muted = false;
                $(this).html('🔊 Mute');
            } else {
                video.muted = true;
                $(this).html('🔇 Unmute');
            }
        }
    });

    $('#charSlider').on('slide.bs.carousel', function (e) {
    var nextVideo = $(e.relatedTarget).data('video');
    var videoEl = document.getElementById('fameBgVideo');

    if (nextVideo && videoEl) {
        videoEl.src = nextVideo;
        videoEl.loop = true;
        videoEl.muted = true;
        videoEl.load();

        var playPromise = videoEl.play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
            }).catch(function(error) {
                console.log("Autoplay video terhambat sistem browser: ", error);
            });
        }
    }
});

    $('#zoneSlider').on('slid.bs.carousel', function(e) {
            var targetIndex = e.to;
        $('.zone-indicators .zone-dot').removeClass('active');
        $('.zone-indicators .zone-dot').eq(targetIndex).addClass('active');
        });

    function startLiveLogTicker() {
    setInterval(function() {
        let ticker = $('#liveLogTicker');
        let itemHeight = ticker.find('li:first').outerHeight();

        ticker.animate({ marginTop: -itemHeight }, 800, function() {
            ticker.find('li:first').appendTo(ticker);
            ticker.css({ marginTop: 0 });
        });
    }, 2500);
}

startLiveLogTicker();

$('#gflForm').submit(function(event) {
    event.preventDefault();

    let nameInput = $('#cmdName').val().trim();
    let zoneInput = $('#cmdZone').val();
    let isValid = true;

    $('#cmdName').removeClass('is-invalid');
    $('#nameError').addClass('d-none');

    if (nameInput === '') {
        $('#cmdName').addClass('is-invalid');
        $('#nameError').removeClass('d-none');
        isValid = false;
    }

    if (isValid) {
        $('#formAlert').removeClass('d-none alert-danger').addClass('alert-success').html(
            '<strong>Registration Successful!</strong> Welcome to contamination zone, Hunter ' + nameInput + '. Your data already enter board!'
        );

        addToRecruitmentBoard(nameInput, zoneInput);
        $('#cmdName').val('');
        $('#cmdZone').val('');

        setTimeout(function() {
            $('#formAlert').addClass('d-none');
        }, 4000);
    }
});

function addToRecruitmentBoard(nameInput, zoneInput) {
    let tbody    = document.getElementById('recruitBody');
    let rowCount = tbody.rows.length + 1;
    let num      = String(rowCount).padStart(3, '0');

    let badgeClass = 'yellow';
    let zoneLabel  = 'Yellow Zone';
    let zoneKey    = 'Yellow';

    if (zoneInput.includes('Black')) {
        badgeClass = 'black';
        zoneLabel  = 'Black Zone';
        zoneKey    = 'Black';
    } else if (zoneInput.includes('Red')) {
        badgeClass = 'red';       
        zoneLabel  = 'Red Zone';
        zoneKey    = 'Red';
    }

    let rMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    let rDay   = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    let rHour  = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    let rMin   = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    let ts     = `2064-${rMonth}-${rDay} ${rHour}:${rMin}`;

    let tr = document.createElement('tr');
    tr.setAttribute('data-zone', zoneKey);
    tr.classList.add('row-new');
    tr.innerHTML = `
        <td class="text-secondary">${num}</td>
        <td>${nameInput}</td>
        <td><span class="badge-zone ${badgeClass}">${zoneLabel}</span></td>
        <td class="text-secondary">${ts}</td>
        <td><button class="btn-status pending" onclick="toggleStatus(this)">PENDING</button></td>
        <td><button class="btn-dismiss" onclick="dismissRow(this)">DISMISS</button></td>
    `;

    tbody.appendChild(tr);
    
    if (typeof updateRecruitCounter === "function") {
        updateRecruitCounter();
    }
}

function applyRecruitFilter() {
    let keyword = $('#recruitSearch').val().toLowerCase().trim();
    let zone    = $('#recruitFilter').val();

    $('#recruitBody tr').each(function() {
        let name    = $(this).find('td:eq(1)').text().toLowerCase();
        let rowZone = $(this).data('zone');

        let matchName = name.includes(keyword);
        let matchZone = (zone === 'ALL') || (rowZone === zone);

        $(this).toggle(matchName && matchZone);
    });
}

$('#recruitSearch').on('input', applyRecruitFilter);
$('#recruitFilter').on('change', applyRecruitFilter);

});