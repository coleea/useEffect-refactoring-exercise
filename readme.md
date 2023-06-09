
# 리액트란

- 리액트는 useEffect 안쓰기 게임이다
- useEffect를 많이 쓴다 -> react를 잘못 쓰고 있는 것일 수 있음
- useEffect를 최소한으로 쓴다 -> 고수


# 참고 1. You Might Not Need an Effect

- react official docs about how to not use useEffect
- https://react.dev/learn/you-might-not-need-an-effect

## Tips from `"You Might Not Need an Effect"`
- state로 파생되는 값은 또다른 state로 생성하지 말고 지역 변수로 생성할것
- props의 변화는 "절대" useEffect로 감지하지 말것
    - props가 변하면 함수가 재호출되므로 props의 변화에 반응하는  코드를 함수 내부에 작성하는 것만으로 충분. useEffect는 불필요 
    - 연산이 헤비하면 useMemo로 래핑할것
    - props가 변화할 때 상태를 초기화하고 싶을 때
        - 함수 컴포넌트의 key attribute를 사용할 것 
- 이벤트 핸들러에서 끝낼 수 있는 작업은 이벤트 핸들러에서 끝낼 것
    - useEffect로 끌고와서 처리하지 말 것
- 이벤트 핸들러에서 fetch할 때
    - setState로 상태변경 후 useEffect에서 fetch하지 말고 이벤트 핸들러 내에서 곧바로 fetch 호출할것
    - fetch를 useEffect에서 호출해도 되는 유일한 순간은 컴포넌트가 mount될 때 뿐
    - 사실 fetch를 useEffect에서 호출하는 것은 좋지않은 관계로 간주됨
        - react-query, swr등의 대체제를 찾을 것
- 이벤트 핸들러에서 2개 이상의 state를 변경하는 상황
    - 상태를 변경하고 그 상태변화를 useEffect가 감지하고 또 다른 상태를 변경하고 그 상태변화를 useEffect가 감지하고 <- 이런 패턴을 useEffect chaining이라고 부름
    - useEffect chaining 패턴은 피할 수 있으면 피하는 것이 좋음
    - 상태변화는 하나의 이벤트 핸들러에서 모두 수행하는 것이 좋음
- 컴포넌트 초기화가 아닌 App을 초기화 할 때
    - 컴포넌트 마운트와 언마운트에 관계없이 앱 레벨에서 관리하는 데이터라면 useEffect에서 생성하지 말것
    - react 외부에서 생성하여 react 내부로 넘겨줄것. 주로 최상위 컴포넌트에게 넘겨주는 것이 일반적
- 가능하면 자식 노드에서 부모노드의 setState 호출하지 말것
    - 자식 노드가 부모 노드의 상태에 의존적인 것은 데이터 흐름의 관점에서 자연스러움
    - 하지만 부모 노드 역시 자식 노드에게 의존적인 것은 일종의 양방향 데이터 흐름인데 이것은 혼란을 야기할 수 있음
- 유저의 타이핑에 반응해서 실시간으로 fetch를 수행하는 상황
    - 구글에서 검색어 입력시에 실시간으로 변하는 추천 키워드를 생각해보자
    - 타이핑을 빠르게 할 경우 이전에 입력한 response가 더 늦게 도착할 수도 있음
    - 예를 들어 hello를 빠르게 타이핑할 때 원래대로라면 hello의 추천 키워드를 보여줘야 하지만 hell의 추천 키워드를 보여줄 수도 있음
    - 이것을 race condition이라고 한다. cleanup함수를 이용하면 해결할 수 있음. 상세는 [여기](https://react.dev/learn/you-might-not-need-an-effect#fetching-data)를 참조 
    - 하지만 fetch를 useEffect에서 사용하는 것은 썩 좋은 방법은 아님. fetch용 대체 라이브러리를 찾는 것이 좋음

- addEventlistener등록은 useEffect에서 수행하지 말고 useExternalSyncStore에서 수행할것

# 참고 2. Goodbye, useEffect

- David Khourshid의 강연 (x-state 저자)
- useEffect 안쓰는 팁을 알려줌
- https://www.youtube.com/watch?v=bGzanfKVFeU
- 의존성 배열은 이펙트를 다루는데 적절한 멘탈 모델이 아님
- react 18 runs effect twice on mount in strict mode

## tips from `"Goodbye, useEffect"`

- fetch시에 race condition문제를 해결하는 방법
    - useEffect안에서 fetch를 수행하지 말고 react-quert나 swr을 사용하거나 `use()`훅을 사용할 것


# 참고 3 : All useEffect Mistakes Every Junior React Developer Makes
    - 부득이하게 useEffect로 fetch를 하고 싶으면 아래의 관례를 적용할것
    - https://www.youtube.com/watch?v=QQYeipc_cik