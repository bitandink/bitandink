# beanlog v2 Refactor Notes

## Overview

v2 리팩터링의 목표는 기존 화면과 인터랙션을 유지하면서, 하나의 거대한
컴포넌트와 CSS 파일에 집중되어 있던 코드를 역할별로 분리하는 것이었다.

기능을 새로 설계하거나 UI를 다시 만드는 작업보다는 다음에 초점을 맞췄다.

-   화면의 역할과 경계를 명확하게 구분
-   route와 실제 UI 구현 분리
-   Main World / Gateway / Virtual World 구조 정리
-   페이지별 component와 style 분리
-   공통 workspace UI 분리
-   Beanlog 콘텐츠의 Markdown 데이터화
-   더 이상 사용하지 않는 legacy workspace 제거
-   기존 컨셉 문서는 삭제하지 않고 v1 기록으로 보존

------------------------------------------------------------------------

## Before

기존 `/bitandink` 영역은 `BitandinkHero.tsx` 하나가 여러 공간과 기능을
동시에 담당하고 있었다.

``` text
BitandinkHero.tsx
├─ Real World / Room
├─ Monitor Transition
├─ Workspace Shell
├─ Current
├─ Archive
├─ Beanlog
├─ Perfugium
└─ Playground
```

스타일 역시 대부분 다음 파일에 집중되어 있었다.

``` text
src/features/bitandink/styles/bitandink.module.css
```

이 구조에서는 Gateway, workspace 공통 UI, 개별 페이지, Playground 실험
기능의 경계가 명확하지 않았다.

------------------------------------------------------------------------

## Refactor Direction

v2에서는 beanlog의 공간을 다음과 같이 구분했다.

``` text
beanlog.site
│
├─ Main World
│
└─ bitandink
   ├─ Real World / Gateway
   │
   └─ Virtual World
      ├─ Home
      ├─ Beanlog
      └─ Playground
```

외부 프로젝트는 Virtual World 내부에 구현하지 않고 링크로 연결한다.

``` text
Webzine
→ https://bitandink.vercel.app

Portfolio
→ https://bitandink.github.io/portfolio-2026/
```

------------------------------------------------------------------------

## 1. Main World 분리

기존 루트 페이지의 `BeanlogWorld.tsx`를 Main World라는 역할에 맞게
정리했다.

### Before

``` text
src/components/BeanlogWorld.tsx
```

### After

``` text
src/main/
├─ components/
│  └─ MainWorld.tsx
└─ styles/
   └─ main-world.css
```

Main World는 다음 기능을 담당한다.

-   BEAN / PAMA / HODU
-   Terminal
-   System HUD
-   Floating data
-   Resident cards
-   Resident profiles
-   Resident interactions
-   Boot sequence

루트 route는 UI를 직접 구현하지 않고 `MainWorld`를 렌더링한다.

``` text
/
→ MainWorld
```

------------------------------------------------------------------------

## 2. Main World CSS 분리

기존 `src/app/globals.css`에는 Main World 전용 스타일 약 3,000줄이 함께
들어 있었다.

이를 분리해:

``` text
src/main/styles/main-world.css
```

로 이동했다.

현재 `globals.css`는 사이트 전체에 필요한 최소한의 전역 설정만 담당한다.

``` text
app/globals.css
→ global reset / html / body

main/styles/main-world.css
→ Main World 전용 스타일
```

------------------------------------------------------------------------

## 3. Gateway 분리

`/bitandink`는 Virtual World의 Home이 아니라 현실 세계의 진입 공간으로
정의했다.

``` text
/bitandink
→ Real World / Gateway
```

구조:

``` text
src/gateway/
├─ components/
│  ├─ BitandinkRoom.tsx
│  ├─ MonitorHint.tsx
│  └─ MonitorTransition.tsx
└─ styles/
   └─ gateway.module.css
```

사용자는 현실의 bitandink 작업 공간에서 모니터 쪽으로 진입하고, 화면
전환을 거쳐 다음 route로 이동한다.

``` text
/bitandink
    ↓
Monitor Transition
    ↓
/bitandink/home
```

기존의 방과 모니터 진입 연출은 유지하면서 코드의 역할만 분리했다.

------------------------------------------------------------------------

## 4. Virtual World route 분리

기존에는 하나의 컴포넌트 안에서 workspace view 상태를 변경하는
방식이었다.

v2에서는 각 공간을 실제 route로 분리했다.

``` text
/bitandink/home
/bitandink/beanlog
/bitandink/playground
```

각 route의 실제 UI는 `src/world`에서 관리한다.

``` text
src/world/
├─ home/
├─ beanlog/
└─ playground/
```

`src/app`은 route entry 역할만 담당한다.

------------------------------------------------------------------------

## 5. Shared Workspace 분리

Home, Beanlog, Playground에서 공통으로 사용하는 workspace UI를
`shared`로 이동했다.

``` text
src/shared/
├─ components/
│  ├─ WorldShell.tsx
│  └─ WorldSidebar.tsx
└─ styles/
   └─ world.module.css
```

공통 요소:

-   Sidebar
-   Topbar
-   Breadcrumb
-   Workspace status
-   Mobile menu
-   Mobile overlay

Sidebar navigation도 현재 route 구조에 맞게 정리했다.

``` text
SPACES
⌂ Home
◈ Beanlog
↗ Webzine
↗ Portfolio

LAB
＋ Playground
```

Webzine과 Portfolio만 외부 링크로 유지한다.

------------------------------------------------------------------------

## 6. Beanlog Markdown 분리

Beanlog의 resident log를 컴포넌트 내부 데이터에서 Markdown 콘텐츠로
분리했다.

``` text
src/content/beanlog/
├─ 2026-08-12-hodu.md
├─ 2026-08-18-hodu.md
├─ 2026-08-19-pama.md
└─ 2026-08-21-bean.md
```

하나의 Markdown 파일이 하나의 log entry다.

Frontmatter:

``` yaml
---
resident: "hodu"
date: "2026-09-10"
mood: "suspicious"
---
```

의도적으로 단순한 구조를 유지한다.

사용하지 않는 필드:

-   title
-   slug
-   tags
-   categories
-   description

Markdown 파일은 서버에서 읽고 날짜 기준 최신순으로 정렬한다.

관련 코드:

``` text
src/world/beanlog/
├─ components/
│  └─ BeanlogView.tsx
├─ lib/
│  └─ getBeanlogEntries.ts
├─ styles/
│  └─ beanlog.module.css
└─ types.ts
```

------------------------------------------------------------------------

## 7. Playground 분리

기존 `BitandinkHero.tsx` 안에 포함되어 있던 Playground의 상태와
인터랙션을 독립 영역으로 분리했다.

``` text
src/world/playground/
├─ components/
│  └─ PlaygroundView.tsx
├─ styles/
│  └─ playground.module.css
└─ types.ts
```

기존 Playground의 주요 기능과 인터랙션은 유지했다.

리팩터링의 목적은 Playground를 새로 만드는 것이 아니라 기존 기능을
독립적인 영역으로 옮기는 것이었다.

------------------------------------------------------------------------

## 8. Home 분리

Virtual World의 기본 진입 화면을 별도의 Home으로 구성했다.

``` text
src/world/home/
├─ components/
│  └─ WorldHome.tsx
└─ styles/
   └─ home.module.css
```

Home은 다음 공간의 진입점을 제공한다.

``` text
Beanlog
Webzine
Portfolio
Playground
```

------------------------------------------------------------------------

## 9. CSS Ownership 정리

기존에는 여러 영역의 CSS가 하나의 파일에 섞여 있었다.

v2에서는 각 영역이 자신의 스타일을 관리한다.

``` text
Main World
→ src/main/styles/main-world.css

Gateway
→ src/gateway/styles/gateway.module.css

Shared Workspace
→ src/shared/styles/world.module.css

Home
→ src/world/home/styles/home.module.css

Beanlog
→ src/world/beanlog/styles/beanlog.module.css

Playground
→ src/world/playground/styles/playground.module.css
```

이 작업을 통해 기존:

``` text
src/features/bitandink/styles/bitandink.module.css
```

의 역할을 완전히 제거했다.

------------------------------------------------------------------------

## 10. Legacy Workspace 제거

v2에서는 더 이상 필요하지 않은 기존 workspace view를 제거했다.

``` text
Current
Archive
Perfugium
```

Webzine과 Portfolio는 독립된 프로젝트이므로 beanlog 내부 workspace
view로 유지하지 않는다.

기존의 단일 view state 기반 구조 역시 route 기반 구조로 대체했다.

------------------------------------------------------------------------

## 11. Legacy Directory 정리

리팩터링 이후 다음 legacy 구조를 제거했다.

``` text
src/features/
src/components/
```

각 파일은 역할에 맞는 위치로 이동했다.

``` text
BeanlogWorld.tsx
→ src/main/components/MainWorld.tsx

BitandinkHero.tsx
→ 역할별 component로 분리

bitandink.module.css
→ 역할별 style 파일로 분리
```

------------------------------------------------------------------------

## 12. Documentation 보존

기존 컨셉과 초기 설계 문서는 삭제하지 않는다.

v1 문서로 이동해 당시의 설계 방향을 그대로 보존한다.

``` text
docs/
├─ v1/
│  ├─ concept.md
│  ├─ content-model.md
│  ├─ information-architecture.md
│  ├─ interactions.md
│  └─ world-boundary.md
│
└─ v2/
   ├─ architecture.md
   └─ refactor-notes.md
```

`v1`은 초기 설계 기록이고, `v2`는 현재 실제 구현 구조를 기준으로 한다.

------------------------------------------------------------------------

## Result

v2 리팩터링 이후 코드의 책임 관계는 다음과 같이 정리되었다.

``` text
app
→ routing

main
→ beanlog.site Main World

gateway
→ Real World / Monitor entrance

world
→ Virtual World pages

shared
→ Virtual World shared UI

content
→ Markdown content

config.ts
→ site configuration
```

최종적으로 화면의 시각적 구성과 기존 인터랙션은 유지하면서, 각 공간과
기능이 자신의 component와 style을 소유하도록 구조를 변경했다.

이후 기능을 추가할 때도 기존 거대 컴포넌트에 코드를 계속 붙이는 대신,
기능이 실제로 속하는 영역에서 독립적으로 확장할 수 있도록 하는 것이 v2
구조의 핵심이다.
