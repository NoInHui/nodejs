function getDefaultFileName(date) {
    let year = date.getFullYear().toString();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    month = month >= 10 ? month.toString() : '0' + month;
    day = day >= 10 ? day.toString() : '0' + day;	
    hour = hour >= 10 ? hour.toString() : '0' + hour;
    minutes = minutes >= 10 ? minutes.toString() : '0' + minutes;	
    seconds = seconds >= 10 ? seconds.toString() : '0' + seconds;	
    
    return `${year}-${month}-${day}-${hour}-${minutes}-${seconds}`;
}

function dateFormat(date, type) {
    let year = date.getFullYear().toString();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = month >= 10 ? month.toString() : '0' + month;
    day = day >= 10 ? day.toString() : '0' + day;	
    let result = type == 'int' ? parseInt(`${year}${month}${day}`) : `${year}-${month}-${day}`;
    return result;
}

function alertDialog(title) {
    const Toast = Swal.mixin({
      toast: true,
      // position: 'bottom-end',
      // showConfirmButton: false,
      // timer: 2000,
      // timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    })

    Toast.fire({
      // icon: 'error',
      title: title
    })
}

function setEditor(editor, content = '', writeAuth) {
  let sLang = "ko_KR";
  let htParams = {
      bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
      I18N_LOCALE : sLang,
      fOnBeforeUnload : function(){},		// submit alert 제거
      bUseToolbar: true,                  // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
      bUseModeChanger: true,              // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
      aAdditionalFontList : [["Noto Sans KR","Noto Sans"], ["Malgun Gothic","Malgun Gothic"]],
      SE2M_FontName: {
        htMainFont: {'id': 'Noto Sans KR','name': 'Noto Sans KR', 'url': '','cssUrl': ''} // 기본 글꼴 설정
      },
  };

  nhn.husky.EZCreator.createInIFrame({
      oAppRef: editor.editor,
      elPlaceHolder: editor.id,
      sSkinURI: "/lib/smarteditor2-2.9.1/SmartEditor2Skin.html",	
      htParams : htParams,
      fOnAppLoad : function(){
          editor.editor.getById[editor.id].setDefaultFont("Noto Sans KR", 12);
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

function pdfExport(object) {
  const pdfDoc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress : true,
  });
  const pdfImgWidth = 210;
  const pdfMargin = 0;
  const pdfPosition = 0;

  html2canvas(object ,{
    allowTaint : true,	// cross-origin allow 
    useCORS : true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
    scale : 2,			// 기본 96dpi에서 해상도를 두 배로 증가
  }).then(function(canvas) {
    let pdfImgData = canvas.toDataURL('image/png');  
    let pdfImgHeight = canvas.height * pdfImgWidth / canvas.width;

    pdfDoc.addImage(pdfImgData, 'PNG', pdfMargin, pdfPosition, pdfImgWidth, pdfImgHeight, '', 'FAST');
    // pdfDoc.addPage();
    const fileName = `${dateFormat(new Date())}.pdf`;
    pdfDoc.save(fileName);
  });
}

function hwpExport(object) {
  let hwpHtml = `<html><head><meta charset='utf-8'></head><body>`;
  hwpHtml += object.html();
  hwpHtml += `</body></html>`;
  let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(hwpHtml);
  let fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  let fileName = `${dateFormat(new Date())}.hwp`;
  fileDownload.download = fileName;
  fileDownload.click();
  document.body.removeChild(fileDownload);
}


