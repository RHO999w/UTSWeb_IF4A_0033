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

});