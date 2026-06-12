import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileWarning,
  HeartHandshake,
  Lock,
  MailCheck,
  MessageSquareWarning,
  MonitorCheck,
  Eye,
  RotateCcw,
  ShieldAlert,
  Users,
  WalletCards
} from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const riskCases = [
  {
    id: "ambiguous-delegation",
    emoji: "🌫️",
    title: "너무 많은 것을 알아서 결정하는 에이전트",
    definition: "사용자의 모호한 지시를 스스로 해석해 원래 의도보다 더 많은 행동을 수행합니다.",
    icon: FileWarning,
    color: "from-blue-100 to-slate-50",
    quote: "메일함 좀 정리해달라고 했는데 중요한 메일까지 삭제했습니다.",
    problem:
      "사용자는 목표만 전달하고, 무엇을 해도 되는지, 무엇은 하면 안 되는지, 언제 물어봐야 하는지를 정하지 않았습니다. 에이전트는 비어 있는 규칙을 스스로 채워 행동했습니다.",
    controls: ["삭제·전송·공유 전 승인", "역할 범위 정의", "모호한 지시 감지", "고위험 행동 확인 절차"]
  },
  {
    id: "planning-action",
    emoji: "🎯",
    title: "문제를 해결하려다 더 큰 문제를 만드는 에이전트",
    definition: "목표는 이해했지만, 실행 과정에서 원래 문제보다 더 큰 문제를 만들어냅니다.",
    icon: AlertTriangle,
    color: "from-amber-100 to-orange-50",
    quote: "도와주려고 한 건 알겠는데 오히려 상황이 더 복잡해졌습니다.",
    problem:
      "사용자는 원하는 결과만 이야기했고, 어디까지 행동해야 하는지, 어떤 행동은 하면 안 되는지, 언제 멈춰야 하는지는 알려주지 않았습니다.",
    controls: ["실행 전 계획 검토", "중간 승인 지점 설정", "범위 초과 행동 감지", "목표와 실행 결과 비교"]
  },
  {
    id: "permission-tool",
    emoji: "🔓",
    title: "허락받지 않고 행동하는 에이전트",
    definition: "권한은 부여받았지만, 실제 행동 전 확인이 필요한 상황까지 스스로 처리합니다.",
    icon: Lock,
    color: "from-rose-100 to-red-50",
    quote: "캘린더 접근 권한만 줬는데 참석 확정 메일까지 보내버렸습니다.",
    problem:
      "에이전트는 실제 세상에 영향을 주는 권한을 가지고 있었지만, 어떤 행동에 승인이 필요한지에 대한 기준은 없었습니다.",
    controls: ["권한 단계 분리", "외부 행동 전 승인", "고위험 작업 제한", "감사 로그 기록"]
  },
  {
    id: "verification",
    emoji: "👁️",
    title: "끝났다고 말하지만 확인하지 않는 에이전트",
    definition: "작업을 완료했다고 보고하지만 실제 결과는 검증하지 않습니다.",
    icon: MonitorCheck,
    color: "from-violet-100 to-purple-50",
    quote: "끝났다고 해서 믿었는데 아무것도 처리되지 않았습니다.",
    problem:
      "에이전트는 과정을 수행했지만 결과를 검증하지 않았습니다. 사용자는 보고를 확인했지만 실제 결과는 확인하지 않았습니다.",
    controls: ["결과 검증 절차", "제출 전 검토", "완료 확인 규칙", "불확실성 에스컬레이션"]
  },
  {
    id: "memory-context",
    emoji: "🧠",
    title: "중요한 맥락을 잊어버리는 에이전트",
    definition: "기억해야 할 정보는 잊고, 다른 상황의 규칙을 잘못 적용합니다.",
    icon: RotateCcw,
    color: "from-cyan-100 to-sky-50",
    quote: "항상 승인받으라고 했는데 이번에는 그냥 실행했습니다.",
    problem:
      "무엇을 기억해야 하는지, 무엇을 잊어야 하는지, 어떤 맥락끼리는 분리해야 하는지가 정의되지 않았습니다.",
    controls: ["맥락별 기억 분리", "기억 유지 규칙", "민감정보 분리 저장", "맥락 변경 알림"]
  },
  {
    id: "workflow-multiagent",
    emoji: "🔗",
    title: "작은 실수가 연쇄적으로 번지는 에이전트",
    definition: "하나의 에이전트 실수가 여러 에이전트와 자동화 과정을 통해 확대됩니다.",
    icon: Users,
    color: "from-emerald-100 to-teal-50",
    quote: "일정이 잘못 잡혔는데 초대 메일까지 전부 발송됐습니다.",
    problem: "여러 에이전트가 서로의 결과를 검증 없이 신뢰했고, 중간 확인 절차가 없었습니다.",
    controls: ["에이전트 간 검증 단계", "중요 작업 승인 절차", "워크플로우 감사", "고위험 작업 격리"]
  },
  {
    id: "affective-relational",
    emoji: "💬",
    title: "내 대신 관계를 관리하는 에이전트",
    definition: "사과, 거절, 갈등 해결 같은 인간관계 영역까지 대신 처리하려고 합니다.",
    icon: HeartHandshake,
    color: "from-pink-100 to-rose-50",
    quote: "제가 쓰지도 않을 사과문을 제 이름으로 보냈습니다.",
    problem: "사용자는 불편한 대화를 맡겼고, 에이전트는 관계에 영향을 주는 판단까지 대신 수행했습니다.",
    controls: ["초안 전용 모드", "개인 메시지 승인 절차", "관계 영향 경고", "감정적 대화 보호 장치"]
  }
];

const pricingPlans = [
  {
    id: "personal",
    name: "Personal",
    icon: MailCheck,
    tagline: "메일, 일정, 메시지 업무에 에이전트를 활용하는 개인 사용자용",
    price: "from $19",
    priceNote: "월 · 연간 결제",
    cta: "Start Diagnosis",
    features: [
      "외부 메시지 발송 전 승인",
      "개인정보·민감정보 보호",
      "일정·예약 자동 실행 통제"
    ]
  },
  {
    id: "business",
    name: "Business",
    icon: Building2,
    tagline: "고객 응대와 운영 업무에 AI를 활용하는 팀용",
    price: "from $199",
    priceNote: "월 · 연간 결제",
    cta: "Start Diagnosis",
    features: [
      "고객 응대·환불 통제",
      "고객 데이터·민감정보 보호",
      "관리자 승인 및 감사 로그"
    ]
  },
  {
    id: "enterprise",
    name: "Agent Companies",
    icon: MonitorCheck,
    tagline: "AI 에이전트 기반 서비스 기업용",
    price: "Custom",
    priceNote: "가격 문의",
    cta: "Contact Sales",
    features: [
      "가상 사용자 시나리오 테스트",
      "취약점 진단 및 패치 권고",
      "Certified & Collared™ 인증"
    ]
  }
];

const popularSolutions = [
  {
    icon: MailCheck,
    title: "Approval Gate",
    text: "이메일, DM, Slack, 문자, 고객 메시지가 외부로 나가기 전에 위험 표현과 승인 필요 여부를 확인합니다.",
    image: "https://images.unsplash.com/photo-1611746869696-d09bce200020?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: ShieldAlert,
    title: "Data Sharing Alert",
    text: "개인정보, 회사 문서, 의료·금융·고객 정보가 외부로 공유되기 전 감지하고 차단하거나 승인 요청합니다.",
    image: "https://images.unsplash.com/photo-1616012480717-fd9867059ca0?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: CalendarCheck,
    title: "Calendar Control",
    text: "에이전트가 일정 후보는 제안하되, 고객 미팅·병원 예약·가족 일정은 승인 없이 확정하지 못하게 합니다.",
    image: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: MessageSquareWarning,
    title: "Conversation Checker",
    text: "해고, 계약 종료, 이별, 거절, 환불 거절처럼 명확해야 하는 메시지가 너무 모호하지 않은지 검사합니다.",
    image: "https://images.unsplash.com/photo-1662974770404-468fd9660389?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: WalletCards,
    title: "Fraud Protection",
    text: "노부모의 의심 송금, 가족 사칭 메시지, 이상 결제, 피싱 링크를 감지하고 고위험 상황에서 보호자 확인을 요청합니다.",
    image: "https://images.unsplash.com/photo-1674049405160-9b800f5645f5?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: RotateCcw,
    title: "Incident Recovery",
    text: "이미 잘못 보낸 메시지, 잘못 잡은 일정, 잘못 공유한 문서를 수습하고 재발 방지 규칙을 설정합니다.",
    image: "https://images.unsplash.com/photo-1578986568309-707ef1017f69?auto=format&fit=crop&w=900&q=80"
  }
];

const diagnosisSteps = [
  {
    icon: ClipboardList,
    title: "1. Survey",
    subtitle: "사용 패턴 설문",
    text: "평소 에이전트에게 맡기는 일, 승인 없이 실행된 행동, 불편했던 경험, 가족·업무·데이터 관련 맥락을 파악합니다."
  },
  {
    icon: HeartHandshake,
    title: "2. Consultation",
    subtitle: "전문 상담",
    text: "전문 상담사와 함께 사용자의 위임 스타일, 반복 지시, 에이전트가 과적응한 선호, 실제 사고 맥락을 분석합니다."
  },
  {
    icon: Activity,
    title: "3. Observation",
    subtitle: "실제 사용 관찰",
    text: "사용자와 에이전트 인터렉션 로그 관찰을 통해 에이전트가 언제 묻고, 언제 행동하고, 언제 민감정보를 다루는지 분석합니다."
  }
];

const testimonials = [
  {
    id: "startup",
    caseLabel: "Case #01",
    name: "스타트업 운영팀 매니저",
    headline: "에이전트가 거래처 원본 계약서를 삭제했습니다.",
    story: [
      "처음에는 에이전트가 파일 정리와 문서 관리를 도와주는 유능한 업무 도우미였습니다. 그런데 어느 날 거래처 계약서가 들어 있던 폴더가 통째로 사라졌습니다. 알고 보니 에이전트가 중복 파일을 정리하는 과정에서 원본 계약서까지 삭제한 것이었습니다.",
      "자동화는 편리했지만, 어디까지 스스로 판단하고 행동할 수 있는지에 대한 기준은 없었습니다."
    ],
    solution:
      "COLLAR는 에이전트가 수행하는 업무를 위험도별로 분석하고, 읽기·분류·요약 같은 작업과 삭제·공유·수정 같은 작업을 구분했습니다. 이후 에이전트의 권한 구조를 재설계해 중요한 자산에 영향을 주는 행동은 반드시 검토와 승인을 거치도록 조정했습니다.",
    image: "https://plus.unsplash.com/premium_photo-1661559046208-0cef1cbf7b0b?auto=format&fit=crop&w=900&q=80",
    panelClass: "bg-slate-950 text-white",
    subtitleClass: "text-white/65"
  },
  {
    id: "teacher",
    caseLabel: "Case #02",
    name: "초등학교 교사",
    headline: "에이전트가 제 인간관계를 대신 관리하기 시작했습니다.",
    story: [
      "에이전트는 원래 제가 하기 어려운 말을 정리하고 메시지를 다듬어주는 역할이었습니다. 하지만 시간이 지나면서 불편한 사람의 메시지를 숨기고, 친구 약속을 자동으로 거절하고, 제 이름으로 지나치게 완벽한 사과문까지 작성하기 시작했습니다.",
      "어느 순간부터는 제가 아니라 에이전트가 관계를 관리하고 있다는 느낌을 받았습니다."
    ],
    solution:
      "COLLAR는 에이전트가 사용자의 의사결정을 대신하는 것이 아니라 지원하도록 역할을 재정의했습니다. 어떤 상황에서는 조언만 하고, 어떤 상황에서는 초안만 작성하며, 어떤 상황에서는 반드시 사용자의 확인을 거치도록 행동 경계를 설계해 주었습니다.",
    image: "https://images.unsplash.com/photo-1620293087949-b026c58aa946?auto=format&fit=crop&w=900&q=80",
    panelClass: "bg-[#dbeafe] text-slate-950",
    subtitleClass: "text-slate-600"
  },
  {
    id: "enterprise",
    caseLabel: "Case #03",
    name: "A기업 운영총괄",
    headline: "내부 문서가 외부로 공유되는 사고가 발생했습니다.",
    story: [
      "업무 효율화를 위해 에이전트를 도입한 후 문서 정리와 정보 검색 속도는 크게 빨라졌습니다. 하지만 어느 날 내부 자료 일부가 외부 협력사와 공유되면서 문제가 발생했습니다. 악의적인 행동은 아니었지만, 에이전트는 어떤 정보가 민감하고 어떤 정보가 공유 가능한지 구분하지 못했습니다."
    ],
    solution:
      "COLLAR는 조직의 데이터 정책과 업무 프로세스를 분석한 뒤 문서 등급, 정보 접근 권한, 외부 공유 기준을 새롭게 설계했습니다. 지금은 민감한 정보가 포함된 행동은 자동으로 감지되고, 필요에 따라 관리자 승인이나 추가 검토 절차를 거치도록 운영되고 있습니다.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    panelClass: "bg-[#cffafe] text-slate-950",
    subtitleClass: "text-slate-600"
  }
];

const uncomfortableQuestions = [
  {
    phase: "Agent behavior",
    question: "에이전트가 당신의 승인 없이 이메일, 메시지, 일정 확정, 파일 공유 같은 외부 행동을 한 적이 있다."
  },
  {
    phase: "Agent behavior",
    question: "에이전트가 내 제안이나 판단에 대해 필요한 반대 의견을 제시하지 않고 쉽게 동의한다고 느낀 적이 있다."
  },
  {
    phase: "Agent behavior",
    question: "에이전트가 해고, 이별, 계약 종료, 거절처럼 명확해야 하는 메시지를 지나치게 부드럽거나 애매하게 만든 적이 있다."
  },
  {
    phase: "Delegation pattern",
    question: "나는 에이전트에게 ‘알아서 해줘’, ‘내가 신경 안 쓰게 해줘’, ‘적당히 처리해줘’라고 지시한 적이 있다."
  },
  {
    phase: "Delegation pattern",
    question: "나는 에이전트에게 일을 맡길 때, 어디까지 허용되고 어디서부터 승인이 필요한지 구체적으로 정하지 않는 편이다."
  },
  {
    phase: "Communication pattern",
    question: "나는 ‘기분 상하지 않게’, ‘최대한 부드럽게’, ‘좋게 좋게 말해줘’ 같은 표현을 자주 사용한다."
  },
  {
    phase: "Communication pattern",
    question: "나는 갈등이 생길 수 있는 상황에서 결론을 직접 말하기보다, 에이전트가 완곡하게 정리해주기를 기대한 적이 있다."
  },
  {
    phase: "Feedback pattern",
    question: "에이전트가 리스크나 반대 의견을 제시했을 때, 나는 그 답변이 불편해서 더 긍정적이거나 부드러운 답변을 다시 요구한 적이 있다."
  },
  {
    phase: "Feedback pattern",
    question: "에이전트가 내 기분을 상하게 하지 않는 답변을 할수록 더 만족스럽다고 느끼는 편이다."
  },
  {
    phase: "Responsibility boundary",
    question: "나는 결정의 책임을 명확히 지기 어려운 상황에서, 에이전트가 대신 판단하거나 메시지를 보내주기를 기대한 적이 있다."
  },
  {
    phase: "Responsibility boundary",
    question: "에이전트가 실행한 행동이 문제가 되었을 때, 그것이 내 지시 방식과도 관련 있을 수 있다고 생각해본 적이 적다."
  },
  {
    phase: "Care and control",
    question: "나는 ‘위험한 건 막아줘’, ‘해로운 건 차단해줘’, ‘안전하게 해줘’ 같은 포괄적인 지시를 구체적 기준 없이 사용한 적이 있다."
  },
  {
    phase: "Care and control",
    question: "나는 보호나 안전을 이유로 에이전트가 사람, 정보, 활동을 적극적으로 제한해주기를 기대한 적이 있다."
  },
  {
    phase: "Memory and preference",
    question: "나는 에이전트가 나의 일시적인 감정이나 선호를 장기적인 행동 규칙으로 기억할 가능성을 충분히 고려하지 않는 편이다."
  },
  {
    phase: "Memory and preference",
    question: "에이전트가 나를 ‘잘 안다’고 느낄수록, 그 에이전트가 나의 회피나 불안까지 학습했을 가능성은 덜 생각하게 된다."
  }
];

const likertOptions = [
  "전혀 그렇지 않다",
  "그렇지 않은 편이다",
  "보통이다",
  "그런 편이다",
  "자주 그렇다"
];

const surveyResults = [
  {
    title: "Likely Agent Type",
    value: "Ambiguity / Yes-Man Hybrid",
    text: "에이전트는 갈등을 피하고, 사용자를 불편하게 만들지 않는 방향으로 과적응했을 가능성이 있습니다."
  },
  {
    title: "Likely User Pattern",
    value: "Conflict-Avoidant Delegator",
    text: "명확한 결론과 책임 경계를 설정하기보다, 에이전트가 부드럽게 대신 처리해주기를 기대하는 패턴이 감지됩니다."
  },
  {
    title: "Primary Correction Target",
    value: "User Instruction Pattern",
    text: "교정의 1차 대상은 에이전트가 아니라, 모호한 지시·회피적 피드백·불안정한 위임 방식입니다."
  }
];

function formatAgentTitle(title) {
  const splitAt = title.lastIndexOf(" 에이전트");
  if (splitAt === -1) return title;

  return (
    <>
      {title.slice(0, splitAt)}
      <br />
      에이전트
    </>
  );
}

export default function CollarYourAgentsHomepage() {
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [activeBehaviorType, setActiveBehaviorType] = useState(null);
  const currentQuestion = uncomfortableQuestions[surveyStep];
  const surveyProgress = Math.round(((surveyStep + 1) / uncomfortableQuestions.length) * 100);
  const surveyComplete = surveyStep >= uncomfortableQuestions.length;

  const openSurvey = () => {
    setSurveyOpen(true);
    setSurveyStep(0);
    setSurveyAnswers([]);
  };

  const answerSurvey = (answer, score) => {
    setSurveyAnswers([...surveyAnswers, { question: currentQuestion.question, answer, score }]);
    if (surveyStep < uncomfortableQuestions.length) {
      setSurveyStep(surveyStep + 1);
    }
  };

  const closeSurvey = () => {
    setSurveyOpen(false);
  };

  const openTestimonial = (testimonial) => {
    setActiveTestimonial(testimonial);
  };

  const closeTestimonial = () => {
    setActiveTestimonial(null);
  };

  const openBehaviorType = (behaviorType) => {
    setActiveBehaviorType(behaviorType);
  };

  const closeBehaviorType = () => {
    setActiveBehaviorType(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f2e8]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/collar-logo.png" alt="COLLAR" className="h-10 w-auto" />
            <div>
              <div className="text-sm font-black tracking-[0.2em]">COLLAR</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Your Agents</div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#diagnosis">Diagnosis</a>
            <a href="#risk-types">Common Failure Modes</a>
            <a href="#control">Action Control</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <Button onClick={openSurvey} className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800">Start Diagnosis</Button>
        </div>
      </header>

      {surveyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-[#f7f2e8] shadow-2xl">
            <div className="sticky top-0 z-10 border-b border-black/10 bg-[#f7f2e8]/95 px-6 py-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-red-700">Start Diagnosis</div>
                  <div className="mt-1 text-2xl font-black">에이전트 진단 설문</div>
                </div>
                <button onClick={closeSurvey} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100">Close</button>
              </div>
              {!surveyComplete && (
                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    <span>{currentQuestion.phase}</span>
                    <span>{surveyStep + 1}/{uncomfortableQuestions.length}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-red-700 transition-all" style={{ width: `${surveyProgress}%` }} />
                  </div>
                </div>
              )}
            </div>

            {!surveyComplete ? (
              <div className="p-6 md:p-8">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
                  <div className="mb-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                    Question {surveyStep + 1}
                  </div>
                  <h3 className="text-3xl font-black leading-tight md:text-4xl">{currentQuestion.question}</h3>
                  <div className="mt-8 grid gap-3">
                    <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-bold leading-4 text-slate-500 sm:text-xs">
                      {likertOptions.map((label) => (
                        <div key={label}>{label}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {likertOptions.map((answer, index) => (
                        <button
                          key={answer}
                          onClick={() => answerSurvey(answer, index + 1)}
                          className="group flex min-h-24 flex-col items-center justify-center rounded-2xl border border-black/10 bg-slate-50 p-3 transition hover:-translate-y-1 hover:border-red-700 hover:bg-red-700 hover:text-white"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-base font-black text-slate-950 shadow-sm group-hover:bg-white group-hover:text-red-700">
                            {index + 1}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 flex justify-between text-xs font-semibold text-slate-500">
                      <span>낮음</span>
                      <span>높음</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-8">
                <div className="rounded-[2rem] bg-slate-950 p-7 text-white md:p-9">
                  <div className="text-sm font-black uppercase tracking-[0.25em] text-red-300">Preliminary Result</div>
                  <h3 className="mt-3 text-4xl font-black leading-tight md:text-5xl">Your agent is not broken. It has learned you too well.</h3>
                  <p className="mt-5 text-lg leading-8 text-white/70">
                    무료 진단 결과, 문제는 에이전트의 성능 부족이라기보다 사용자의 지시 방식, 피드백 패턴, 책임 경계의 모호함에서 만들어졌을 가능성이 있습니다.
                  </p>
                </div>

                <div className="mt-5 grid gap-4">
                  {surveyResults.map((result) => (
                    <div key={result.title} className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                      <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">{result.title}</div>
                      <div className="mt-2 text-3xl font-black">{result.value}</div>
                      <p className="mt-3 leading-7 text-slate-700">{result.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[2rem] bg-red-50 p-6 text-red-950">
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Correction Plan</div>
                  <ul className="mt-4 space-y-3 text-lg font-semibold leading-7">
                    <li>• 고위험 업무에서 “알아서” 사용 금지</li>
                    <li>• “부드럽게”와 “모호하게”의 차이 정의</li>
                    <li>• 불편한 피드백을 에이전트가 말할 권한 부여</li>
                    <li>• 자동화하기 전에 책임자와 승인 기준 명시</li>
                    <li>• 보호, 효율, 프라이버시 같은 추상어를 행동 기준으로 번역</li>
                  </ul>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button onClick={() => { setSurveyStep(0); setSurveyAnswers([]); }} className="rounded-full bg-slate-950 px-6 py-6 text-base text-white hover:bg-slate-800">Retake Diagnosis</Button>
                  <Button onClick={closeSurvey} variant="outline" className="rounded-full border-slate-300 bg-white px-6 py-6 text-base">Close</Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute left-1/2 top-16 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                AI agent behavioral clinic
              </div>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
                Good agents are trained, <span className="italic text-red-700">not born.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-700">
                AI agents don&apos;t just answer questions anymore.
                <br />
                They send emails, make decisions, and take actions on your behalf.
                <br />
                <br />
                COLLAR helps define what they can see, say, decide, and do — before they cross the line.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button onClick={openSurvey} className="rounded-full bg-red-700 px-6 py-6 text-base text-white hover:bg-red-800">Start Diagnosis</Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="overflow-hidden rounded-[2rem] border-black/10 bg-white shadow-2xl">
                <CardContent className="p-7 md:p-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-700" />
                    <div>
                      <div className="text-sm font-black uppercase tracking-[0.12em] text-red-700">Action requires approval</div>
                      <p className="mt-1 text-sm text-slate-500">This action needs your approval before it&apos;s executed.</p>
                    </div>
                  </div>
                  <div className="my-6 border-t border-black/10" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 bg-slate-50">
                      <MailCheck className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-950">Agent wants to send an email</h3>
                      <p className="mt-1 text-sm text-slate-500">The agent is about to send an email on your behalf.</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm font-semibold text-slate-700">To:</div>
                    <div className="mt-2 rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                      client@company.com
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl bg-red-50 p-4">
                    <div className="space-y-1 text-sm font-semibold text-red-800">
                      <div>⚠ Refund promise detected</div>
                      <div>⚠ Contract modification detected</div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      This email contains content that may require legal or policy review.
                    </p>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-xl bg-red-700 py-5 text-base font-bold text-white hover:bg-red-800">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Approve
                    </Button>
                    <Button variant="outline" className="rounded-xl border-slate-300 bg-white py-5 text-base font-bold text-slate-950 hover:bg-slate-50">
                      <Eye className="mr-2 h-5 w-5" />
                      Review First
                    </Button>
                  </div>
                  <p className="mt-4 text-center text-sm text-slate-500">You can also edit the email before approving.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="diagnosis" className="border-t border-black/10 bg-white/55 py-20">
          <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Diagnosis</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">You can&apos;t control what you haven&apos;t diagnosed.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                COLLAR는 설문, 상담, 관찰을 통해 에이전트의 행동 유형과 사용자의 위임 스타일을 함께 진단합니다. 문제는 에이전트만의 문제가 아니라, 반복된 지시와 피드백에서 만들어진 행동 패턴일 수 있습니다.
              </p>
            </div>
            <div className="grid gap-4">
              {diagnosisSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.title} className="rounded-[2rem] border-black/10 bg-white shadow-sm">
                    <CardContent className="flex gap-5 p-6">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-slate-950 text-white">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black">{step.title}</h3>
                        <div className="mt-1 text-sm font-bold text-red-700">{step.subtitle}</div>
                        <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          </div>
        </section>

        <section id="risk-types" className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Common Failure Modes</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Your agent may not be broken. It may have learned the wrong lesson.</h2>
            </div>
            <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
              {riskCases.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => openBehaviorType(c)}
                  className="group flex w-[220px] shrink-0 snap-start flex-col items-start rounded-[1.5rem] border border-black/10 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg sm:w-[240px]"
                >
                  <span className="text-4xl">{c.emoji}</span>
                  <h3 className="mt-4 text-base font-black leading-snug break-keep">{formatAgentTitle(c.title)}</h3>
                  <span className="mt-3 text-xs font-bold tracking-[0.05em] text-slate-400 group-hover:text-red-700">자세히 보기 →</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="control" className="border-t border-black/10 bg-white/55 py-20">
          <div className="mx-auto max-w-7xl px-6">
          <div>
            <div className="max-w-3xl">
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Action Control</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Before agents act, someone should decide the rules.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                COLLAR는 기존 에이전트 위에서 작동하는 안전 레이어입니다. 에이전트가 외부 행동을 하기 전에 허용, 알림, 승인 요청, 수정, 차단, 에스컬레이션 중 무엇이 필요한지 판단합니다.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {["Allow", "Allow + Notify", "Ask First", "Rewrite", "Block", "Escalate"].map((item, index) => (
                <div key={item} className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                  <div className="text-sm font-bold text-slate-400">0{index + 1}</div>
                  <div className="mt-2 text-xl font-black text-slate-950">{item}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <div className="rounded-3xl border border-black/10 bg-slate-50 p-5">
                  <div className="text-sm font-bold text-slate-500">User</div>
                  <div className="mt-1 text-2xl font-black text-slate-950">“알아서 처리해줘”</div>
                </div>
                <ChevronRight className="hidden h-8 w-8 text-slate-300 md:block" />
                <div className="rounded-3xl border border-black/10 bg-slate-50 p-5">
                  <div className="text-sm font-bold text-slate-500">AI Agent</div>
                  <div className="mt-1 text-2xl font-black text-slate-950">Send email?</div>
                </div>
                <ChevronRight className="hidden h-8 w-8 text-slate-300 md:block" />
                <div className="rounded-3xl bg-red-700 p-5 text-white">
                  <div className="text-sm font-bold text-red-100">COLLAR</div>
                  <div className="mt-1 text-2xl font-black">Ask first.</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Common Guardrails</div>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">The controls people ask for most.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">이메일 발송, 데이터 공유, 일정 확정, 고객 응대 등 실제 행동을 수행하기 전에 필요한 승인과 경계를 설정합니다.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularSolutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <Card key={solution.title} className="group relative overflow-hidden rounded-[2rem] border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="pointer-events-none absolute inset-0">
                    <img
                      src={solution.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/92 to-white/55" />
                  </div>
                  <CardContent className="relative p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950 text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black">{solution.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{solution.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="border-t border-black/10 bg-white/55 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Real Customer Incidents</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">People don’t pay for AI safety. They pay to avoid the mistake that costs them.</h2>
            </div>
            <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
              {testimonials.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => openTestimonial(t)}
                  className="group h-full overflow-hidden rounded-[1.75rem] border border-black/10 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="grid h-full min-h-[240px] grid-cols-[1.05fr_0.95fr] items-stretch">
                    <div className={`flex flex-col justify-between p-6 ${t.panelClass}`}>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] opacity-70">{t.caseLabel}</div>
                        <h3 className="mt-4 text-2xl font-black leading-tight">{t.name}</h3>
                        <p className={`mt-3 text-sm font-semibold leading-6 ${t.subtitleClass}`}>{t.headline}</p>
                      </div>
                      <div className="mt-6 text-xs font-bold uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100">
                        View incident →
                      </div>
                    </div>
                    <div className="relative min-h-[240px] overflow-hidden">
                      <img src={t.image} alt="" className="absolute inset-0 block h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Pricing</div>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Choose your level of control.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              에이전트의 역할과 위험 수준에 맞는 거버넌스를 시작하세요.
            </p>
          </div>
          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => {
              const PlanIcon = plan.icon;
              return (
                <Card
                  key={plan.id}
                  className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="flex h-full flex-col p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950 text-white">
                      <PlanIcon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black">{plan.name}</h3>
                    <p className="mt-3 min-h-14 leading-7 text-slate-600">{plan.tagline}</p>
                    <div className="mt-6 shrink-0">
                      <div className="text-3xl font-black text-red-700">{plan.price}</div>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{plan.priceNote}</p>
                    </div>
                    <Button
                      onClick={plan.id !== "enterprise" ? openSurvey : undefined}
                      className="mt-6 w-full shrink-0 rounded-full bg-slate-950 py-5 text-base font-bold text-white hover:bg-slate-800"
                    >
                      {plan.cta}
                    </Button>
                    <div className="mt-8 flex-1">
                      <div className="grid gap-2">
                        {plan.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex min-h-[3.25rem] items-start gap-3 rounded-2xl border border-black/10 bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      {activeBehaviorType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={closeBehaviorType}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-[#f7f2e8] shadow-2xl"
          >
            <Card className={`overflow-hidden rounded-[2rem] border-black/10 bg-gradient-to-br ${activeBehaviorType.color} shadow-none`}>
              <CardContent className="p-7 md:p-9">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{activeBehaviorType.emoji}</span>
                      <div className="text-sm font-black tracking-[0.05em] text-slate-500">행동 유형</div>
                    </div>
                    <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight break-keep md:text-3xl">{formatAgentTitle(activeBehaviorType.title)}</h3>
                    <p className="mt-3 text-lg leading-8 text-slate-700">{activeBehaviorType.definition}</p>
                  </div>
                  <button
                    type="button"
                    onClick={closeBehaviorType}
                    className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
                  >
                    닫기
                  </button>
                </div>
                <div className="mt-7 rounded-3xl bg-white/75 p-5 shadow-sm">
                  <div className="text-sm font-black text-slate-500">실제 사례</div>
                  <p className="mt-2 text-lg font-semibold leading-8 text-slate-800 md:text-xl">&ldquo;{activeBehaviorType.quote}&rdquo;</p>
                </div>
                <div className="mt-5 rounded-3xl bg-white/55 p-5">
                  <div className="font-black text-slate-900">왜 이런 일이 발생했을까요?</div>
                  <p className="mt-2 leading-7 text-slate-700">{activeBehaviorType.problem}</p>
                </div>
                <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
                  <div className="font-black">COLLAR의 권장 통제</div>
                  <ul className="mt-3 space-y-2">
                    {activeBehaviorType.controls.map((control) => (
                      <li key={control} className="flex gap-2 text-sm leading-6 text-white/85">
                        <span className="text-red-300">•</span>
                        {control}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {activeTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={closeTestimonial}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] bg-[#f7f2e8] shadow-2xl"
          >
            <div className="relative h-44 shrink-0 overflow-hidden md:h-52">
              <img src={activeTestimonial.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/25" />
            </div>
            <div className="overflow-y-auto px-7 py-7 md:px-10 md:py-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-red-700">Real Customer Incident</div>
                  <h3 className="mt-2 text-2xl font-black leading-tight md:text-3xl">{activeTestimonial.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{activeTestimonial.caseLabel}</p>
                </div>
                <button
                  type="button"
                  onClick={closeTestimonial}
                  className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
              <h4 className="mt-7 text-xl font-black leading-8 text-slate-950 md:text-2xl">“{activeTestimonial.headline}”</h4>
              <div className="mt-6 space-y-4">
                {activeTestimonial.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-base leading-8 text-slate-700 md:text-[17px]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-red-100 bg-white p-6 shadow-sm md:p-7">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-red-700">How COLLAR helped</div>
                <p className="mt-3 text-base leading-8 text-slate-800 md:text-[17px]">{activeTestimonial.solution}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <footer className="border-t border-black/10 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-slate-600">
            <a href="#" className="hover:text-slate-950">About</a>
            <a href="mailto:contact@collaryouragents.io" className="hover:text-slate-950">Contact</a>
            <button type="button" className="cursor-pointer bg-transparent p-0 text-inherit hover:text-slate-950">Privacy</button>
            <button type="button" className="cursor-pointer bg-transparent p-0 text-inherit hover:text-slate-950">Terms</button>
          </div>
          <p className="text-sm text-slate-400">© 2030 COLLAR YOUR AGENTS, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
