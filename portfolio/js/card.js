$(document).ready(function () {
    $(".card").click(function () {
        $(".card").animate({
            // top: '250px',
            opacity: '0.8',
            height: '650px',
            width: '520px',

        }, "slow");

    });
});