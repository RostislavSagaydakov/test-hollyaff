$(document).ready(()=> {
    commentToggle();
    avatarPreview();
    submitComment();
    quiz();
})

// add toggle action for open/close comment form
function commentToggle() {
    $('.comments_action').on('click', function(){
        $(this).parent('.comments_action-frame').find('.comments_form').slideToggle('fast');
    })
}

// add user avatar preview image
function avatarPreview() {
    const defaultAvatarImg = $('.avatar-preview-holder img').attr('src');
    const defaultAvatarLabelSelector = $('#user-avatar-label');
    const defaultAvatarLabelText = defaultAvatarLabelSelector.text();
    const avatarHolder = $('.avatar-preview-holder');
    $('#user-avatar').on('change', function () {
        const file = this.files[0];

        // check file type
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
            alert('Not an image. Please provide correct file type jpg | jpeg | png | gif');
            return false;
        }
        avatarHolder.empty();

        // show preview
        const reader = new FileReader();
        reader.onload = function (e) {
            const avatarImg = $('<img />', {
                    src: e.target.result
                }).prependTo(avatarHolder);
            const deleteAvatarBtn = $('<button class="avatar-remove btn btn-danger">X</button>').prependTo(avatarHolder);
        };
        reader.readAsDataURL(file);

        // show file name
        $('#user-avatar-label').text(file.name);
    });

    $(document).on('click', '.avatar-remove, .btn-comment', (e)=> {
        e.preventDefault();
        avatarHolder.empty();
        defaultAvatarLabelSelector.text(defaultAvatarLabelText);
        const defaultImg = $('<img />', {
            src: defaultAvatarImg
        }).prependTo(avatarHolder);
    })
}

// submit comment form
function submitComment() {
    const submitCommentBtn = $('.btn-comment');
    const commentField = $('.comments_block-comment textarea')
    commentField.on('keyup', function(){
        if($(this).val().length > 2) {
            submitCommentBtn.attr("disabled", false);
        } else {
            submitCommentBtn.attr("disabled", true);
        }
    })
    submitCommentBtn.on('click', function(e) {
        e.preventDefault()
        const userAvatar = $('.avatar-preview-holder img').attr('src'),
            userName = $('#user-name').val(),
            userComment = $('#user-comment').val();
        $("<div class='comments'>" +
            "<div class='profile'><img src='" + userAvatar + "' alt=''></div>" +
            "<div class='comment-content'>" +
                "<p class='name'>" + (userName.length > 1 ? userName : "Anonymous") + "</p>" +
                "<p>" + userComment + "</p>" +
            "</div>" +
            "<div class='clr'></div>" +
            "<div class='comment-status'>" +
                "<span>Curte·comente</span>" +
                "<img src='assets/images/like.png' />" +
                Math.floor(Math.random() * 100) +
                "<small>" +
                    "&middot;" +
                    "<u>11 minutos antes</u>" +
                "</small>" +
            "</div>" +
        "</div>"
        ).insertAfter('.comments_action-frame')
        $('.comments_form')[0].reset();
        submitCommentBtn.attr("disabled", true);
    })
}

// get answers from quiz
function quiz() {
    let quizArray = [];
    function question(element) {
        let item = {
            q: $.trim(element.parent().find('.question span').text()),
            a: $.trim(element.text())
        }
        quizArray.push(item)
    }
    $('.survey_button').each(function() {
        $(this).on('click', ()=> {
            question($(this));
        })
    })
    $("#p_modal_button3").on("click", function (e) {
        quizArray.map((item1, item2)=> {
            console.table(item1, item2)
        })
    })
}