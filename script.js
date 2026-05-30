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

});