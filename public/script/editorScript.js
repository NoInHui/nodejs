const editorScript = {
    filePath : 'public/save/editor/',

    editor : {
        id: 'editor',
        editor: [],
    },

    fileName : '',

    init : async function() {
        this.changeButtonCss();
        this.setCommonEvent();
        setEditor(editorScript.editor, '', true);
    },

    setCommonEvent : function() {
        $('#saveBtn').click(function() {
            $('#file_name').val(getDefaultFileName(new Date()));
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
                                editorScript.save(false);
                            } else {
                                alertDialog('저장명을 입력해주세요.');
                            }
                        }
                    }
                  ]
            });
        });
    
        $('#loadBtn').click(function() {
            editorScript.load();
        });

        $('#updateBtn').click(function() {
            editorScript.save(true);
        });

        $('#newBtn').click(function() {
            $(`#${editorScript.editor.id}`).text('');
            editorScript.editor.editor.getById[editorScript.editor.id].exec("LOAD_CONTENTS_FIELD");
            editorScript.fileName = '';
            editorScript.changeButtonCss();
        });

        $('#pdfBtn').click(function() {
            let editorBody = $(`#${editorScript.editor.id}`).next('iframe').contents().find('iframe').contents().find('body.se2_inputarea')[0];
            pdfExport(editorBody);
        });

        $('#hwpBtn').click(function() {
            let editorBody = $(`#${editorScript.editor.id}`).next('iframe').contents().find('iframe').contents().find('body.se2_inputarea');
            hwpExport(editorBody);
        });
    },

    load : async function() {
        let param = {
            filePath: editorScript.filePath,
        };

        let response = await fetch('/load'
            , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param),
            }
        );

        if(response.ok) {
            let resultData = await response.json();
            $('#load_dialog').html(Mustache.render($('#load_dialog_template').html(), {fileData : resultData.fileData.reverse()}));
            $('#load_dialog').dialog({
                title: '불러오기',
                width: 300,
                modal: true,
                resizable: false,
                draggable: false,
            });

            $('[name="load_link"]').click(function() {
                editorScript.fileName = $(this).text();
                let fileInfo = resultData.fileData.find(v => v.fileName == editorScript.fileName).fileInfo;
                editorScript.loadData(fileInfo);
            });

            $('.delete_load').click(function() {
                let fileName = $(this).closest('ul').find('[name="load_link"]').text();
                editorScript.delete(fileName);
            });
        } else {
            alertDialog('시스템 오류 발생');
        }
    },

    loadData : function(fileInfo) {
        $(`#${editorScript.editor.id}`).text(fileInfo);
        editorScript.editor.editor.getById[editorScript.editor.id].exec("LOAD_CONTENTS_FIELD");
        editorScript.changeButtonCss();
        $('#load_dialog').dialog('close');
    },

    delete : async function(fileName) {
        let param = {
            filePath: editorScript.filePath,
            fileName,
        };

        let response = await fetch('/delete'
            , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param),
            }
        );

        if(response.ok) {
            editorScript.load();
        } else {
            alertDialog('시스템 오류 발생');
        }
    },

    save : async function(updateFlag) {
        let param = {
            filePath: editorScript.filePath,
            fileName : updateFlag ? editorScript.fileName : $('#file_name').val().trim() + '.html',
            fileInfo: editorScript.editor.editor.getById[editorScript.editor.id].getIR(),
        };
    
        let response = await fetch('/save'
            , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param),
            }
        );
    
        if(response.ok) {
            if(updateFlag) {
                alertDialog('수정완료');
            } else {
                alertDialog('저장완료');
                $('#save_dialog').dialog('close');
                editorScript.fileName = param.fileName;
                editorScript.changeButtonCss();
            }
        } else {
            alertDialog('시스템 오류 발생');
        }
    },

    changeButtonCss : function() {
        $('.editor-button').hide();
        $('#loadBtn, #pdfBtn, #hwpBtn').show();
        
        if(editorScript.fileName) {
            $('h2.fileName').text(editorScript.fileName);
            $('#newBtn, #updateBtn').show();
        } else {
            $('h2.fileName').text('');
            $('#saveBtn').show();
        }
    },

    hwpExport : function(object) {
        
    },
}

editorScript.init();