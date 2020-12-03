import Immutable from 'seamless-immutable'
import { merge, Subject } from 'rxjs'
import { scan, startWith, map } from 'rxjs/operators/index.js'

const createStore = ($stream = []) => {
    if (typeof $stream == 'object' && !Array.isArray($stream)) {
        $stream = [$stream]
    }
    const callBack$ = new Subject().pipe(
        map(callback => state => callback(state))
    )
    const set$ = new Subject().pipe(
        map(data => state => state.merge(data))
    )
    const setIn$ = new Subject().pipe(
        map(({ payload, data }) => state => {
            if (typeof payload == "string") {
                payload = [payload];
            }
            state = state.setIn(payload, data);
            return state
        })
    )
    const getData$ = new Subject().pipe(
        map(callback => state => {
            callback(state)
            return state
        })
    )
    const set = payload => set$.next(payload)
    const setIn = (payload, data) => setIn$.next({ payload, data })
    const callback = payload => callBack$.next(payload)
    const getData = payload => getData$.next(payload)
    const createState = (value = {}) => {
        const initState = Immutable(value)
        const InitStates$ = merge(set$, setIn$, callBack$, getData$)
        const mergeStates$ = $stream.reduce((str$, in$) => merge(str$, in$), InitStates$)
        const states$ = mergeStates$.pipe(
            startWith(initState),
            scan((state, reducer) => {
                if (typeof reducer != 'function') {
                    return state.merge(reducer)
                }
                return reducer(state)
            })
        )
        states$.subscribe(() => {})
        return { set, setIn, callback, getData }
    }
    return createState
}

export default createStore