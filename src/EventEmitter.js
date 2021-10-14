export class EventEmitter {
    constructor() {
        // 登録する [イベント名,Set(リスナー関数)]を管理するMap
        this._listeners = new Map();
    }

    /**
     * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    addEventListener(type, listener) {
        // 指定したイベントに対応するSetを作成しリスナー関数を登録する
        if (!this._listeners.has(type)) {
            this._listeners.set(type, new Set());
        }
        const listenerSet = this._listeners.get(type);
        listenerSet.add(listener);
    }

    /**
     * 指定したイベントをディスパッチする
     * @param {string} type イベント名
     */
    emit(type) {
        // 指定したイベントに対応するSetwp取り出し、全てのリスナー関数を呼び出す
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }

    /**
    * 指定したイベントのイベントリスナーを解除する
    * @param {string} type イベント名
    * @param {Function} listener イベントリスナー
    */
    removeEventListener(type, listener) {
        // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(ownListerner => {
            if (ownListerner === listener) {
                listenerSet.delete(listener);
            }
        });
    }
}


// SAMPLE CODE
// import { EventEmitter } from "./EventEmitter.js";
// const event = new EventEmitter();

// // イベントリスナー（コールバック関数）を登録
// event.addEventListener("test-event", () => console.log("One!"));
// event.addEventListener("test-event", () => console.log("Two!"));

// // イベントをディスパッチする
// event.emit("test-event");

// // コールバック関数がそれぞれ呼びだされ、コンソールには次のように出力される
// // "One!"
// // "Two!"
