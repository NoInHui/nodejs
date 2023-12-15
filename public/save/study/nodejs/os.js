// 노드는 웹 브라우저에서 사용되는 자바스크립트 보다 더 많은 기능을 제공합니다.
// 운영체제 정보에도 접근할 수 있고, 클라이언트가 요청한 주소에 대한 정보도 가져올 수 있습니다.
// 노드에서 이러한 기능을 하는 모듈을 제공합니다.

// os
// 웹 브라우저에 사용되는 자바스크립트 운영체제의 정보를 가져올 수 없지만, 노드는 os 모듈에 정보가 담겨 있어 정보를 가져올 수 있습니다.
// 내장 모듈인 os 를 불러오려면 require('os') , require('node:os') 를 하면 됩니다.
// os 라는 파일이 존재하는 것은 아니지만 노드가 알아서 내장 모듈을 파악해 불러옵니다.

const os = require('os');

console.log(os.platform())
console.log(os.type());
console.log(os.arch());
console.log(os.hostname());
console.log(os.cpus());
console.log(os.freemem());
console.log(os.totalmem());

console.log(os.cpus().length);
// 노드에서 싱글 스레드 프로그래밍을 하면 코어가 몆 개든 상관없이 대부분의 경우 코어를 하나밖에 사용하지 않습니다.
// 하지만 cluster 모듈을 사용하는 경우 코어 개수에 맞춰서 프로세스를 늘릴 수 있습니다.
// 이때 cpus() 메서드를 사용할 것입니다.
