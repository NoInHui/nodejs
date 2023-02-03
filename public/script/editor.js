const editor = {
    id: 'editor',
    editor: [],
}

let fileName = '';

async function init() {
    changeButtonCss();
    setCommonEvent();
    setEditor(editor, '', true);
}

function setCommonEvent() {
    $('#saveBtn').click(function() {
        $('#file_name').val(getDefaultFileName());
        $('#save_dialog').dialog({
			width: 240,
            title: '저장',
			modal: true,
			resizable: false,
			draggable: false,
			buttons: [
				{
					text: `저장`,
					click: function() {
                        if($('#file_name').val().trim() != '') {
                            save();
                        } else {
                            alert('저장명을 입력해주세요.');
                        }
					}
				}
  			]
		});
    });

    $('#loadBtn').click(function() {
        load();
    });
}

async function save() {
    let param = {
        fileName : $('#file_name').val().trim(),
        html: editor.editor.getById[editor.id].getIR(),
    };

    let response = await fetch('/editor/save'
        , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8'
            },
            body: JSON.stringify(param),
        }
    );

    if(response.ok) {
        $('#save_dialog').dialog('close');
        fileName = param.fileName;
    } else {
        alert('시스템 오류 발생');
    }
    
}

function changeButtonCss() {
    $('.editor-button').hide();
    $('#loadBtn').show();
    if(fileName) {
        $('#newBtn, #updateBtn').show();
    } else {
        $('#saveBtn').show();
    }
}

function setEditor(editor, content = '', writeAuth) {

    let sLang = "ko_KR";
    let htParams = {
        bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
        I18N_LOCALE : sLang,
        fOnBeforeUnload : function(){},		// submit alert 제거
        bUseToolbar: true,                  // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
        bUseModeChanger: true,              // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
    };

    nhn.husky.EZCreator.createInIFrame({
        oAppRef: editor.editor,
        elPlaceHolder: editor.id,
        sSkinURI: "/lib/smarteditor2/static/SmartEditor2Skin.html",	
        htParams : htParams,
        fOnAppLoad : function(){
            editor.editor.getById[editor.id].setDefaultFont("맑은고딕", 11);
            editor.editor.getById[editor.id].exec("PASTE_HTML", [content]);

            if(!writeAuth) {
                editor.editor.getById[editor.id].exec("DISABLE_WYSIWYG");
                editor.editor.getById[editor.id].exec("DISABLE_ALL_UI");
            }

            let editorBody = $(`#${editor.id}`).next('iframe').contents().find('iframe').contents().find('body.se2_inputarea');
            editorBody.html(editorBody.children('div').html());
            // $(`#${editor.id}`).next('iframe').contents().find('.se2_conversion_mode').find('.se2_converter').find('button.se2_to_text').closest('li').remove();
        },
        fCreator: "createSEditor2"
    });
}

