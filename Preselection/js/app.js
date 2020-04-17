// 事前予約者数ARを初期化
const AR = 250;

// 総予約者数TR（AR + 当日予約者）※当日予約者を加える処理の際にTRの値を書き換える
var TR = AR;

// エントリーナンバーenと予選順番qoの配列を初期化（データベースへと移行される？）
var en = new Array(TR);
var qo = new Array(TR);

// enに数値を格納する ※当日予約者を加えた場合、この部分の改変が必要
for (i = 0; i < TR; i++) {
    en[i] = i + 1;
}

// 抽選結果を格納しておく変数
var idx;

// startボタンが押された回数を保持しておく変数
var count = 0;

// ルーレットを開始
function start() {
    count++;
    // startボタンを一度押したら、もう一度押せないようにする
    document.getElementById('start').disabled = true;

    // 0.5秒後に stop() の処理を行う
    setTimeout('stop()', 500);

    // ルーレットのランダム表示を行う（0.01秒ごとに id='roulette' の要素が繰り返し書き換わる）
    roulette = setInterval(function () {
        // enの要素からランダムに一つ選ぶ
        idx = en[Math.floor(Math.random() * en.length)];
        // 要素の書き換えを行う
        document.getElementById("roulette").innerHTML = idx;
    }, 10);
}

// ルーレットを停止
function stop() {
    // ルーレットを停止させる
    if (roulette) {
        clearInterval(roulette);
    }

    // 配列eoにルーレットによって決まった予選順番を入れる ※qoへの格納順を count で管理している
    qo[count - 1] = idx;
    console.log('抽選結果: ' + idx);

    // 選ばれた予選順番を除いて新たな配列enを生成
    en = en.filter(n => n !== idx);
    console.log('予選順番が決定していないエントリーナンバー');
    console.log(en);
    console.log('予選順番');
    console.log(qo);
    console.log('抽選回数: ' + count);
    console.log('');

    // startボタンを総予約者数以上押していないなら再度押せるようにする
    if (count < TR) {
        document.getElementById('start').disabled = false;
    }
}