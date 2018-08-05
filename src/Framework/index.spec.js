import {Store, bind} from './index'

describe('Framework', () => {
    describe('.store', () => {
        it('update를 구독시 stream에 현재 상태의 알림이 발행된다', () => {
            const store = new Store({data: 0});
            store.subscribe(state => expect(state).toEqual({data: 0}));
        });

        it('update시마다 이전 state와는 독립적인 새로운 state가 발행된다', () => {
            const states = [];
            const store = new Store({data: 0});
            store.subscribe(state => states.push(state));
            store.update({data: 1});
            store.update({
                data: {
                    array : [1, [2, 3]]
                }
            });

            store.update({
                data: {
                    array : [1, "a"],
                    object : {
                        member : 10
                    }
                }
            });

            store.update({
                data: {
                    object : {
                        member2 : 20
                    }
                }
            });

            expect(states).toEqual([
                {data: 0},
                {data: 1}, {
                    data: {
                        array : [1, [2, 3]]
                    }
                },{
                    data: {
                        array : [1, "a"],
                        object : {
                            member : 10
                        }
                    }
                },{
                    data: {
                        array : [1, "a"],
                        object : {
                            member : 10,
                            member2 : 20
                        }
                    }
                }
            ])
        });
    });

    describe('.bind', () => {
        it('bind 즉시 Store가 template에 반영된다', () => {
            const element = document.createElement('div');
            const store = new Store({
                data: 0
            });
            bind(element, store => `${store.data}`, store);
            expect(element.innerHTML).toBe('0');
        });

        it('bind된 Store update시 HTMLelement에 즉시 반영된다', () => {
            const element = document.createElement('div');
            const store = new Store({
                data: 0
            });
            bind(element, store => `${store.data}`, store);
            store.update({data: 1});
            expect(element.innerHTML).toBe('1');
        });
    });
});