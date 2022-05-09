## Hit 구분
1. Block - 이동 불가
2. Body - 피격 
3. NormalAttack - 일반 공격. Guard, SuperGuard 에 막힘
4. SuperAttack - 특수 공격. SuperGuard 에 막힘
5. NormalGuard - 일반 방어. SuperAttack 못 막음
6. SuperGuard - 특수 방어. 모든 Attack 막음

## 데미지 배율
1. AGLevel 을 배율로 이용한다.

## 충돌 우선 순위
1. Block - Block
2. SuperAttack
    1. SuperGuard
    2. Body
3. Attack
    1. SuperGuard
    2. Guard
    3. Body

## 이동 좌표 계산시 충돌 계산
1. Block - Block
    - 충돌일 경우 이동하지 않는다.