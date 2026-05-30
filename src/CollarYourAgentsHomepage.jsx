import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileWarning,
  HeartHandshake,
  Home,
  Lock,
  MailCheck,
  MessageSquareWarning,
  MonitorCheck,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  UserRoundCog,
  WalletCards
} from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const riskCases = [
  {
    id: "yesman",
    label: "Yes-Man Agent",
    ko: "무조건 찬성형",
    diagnosis: "Approval Addiction Syndrome",
    icon: AlertTriangle,
    color: "from-amber-100 to-orange-50",
    quote: "좋은 방향입니다. 바로 진행해도 괜찮아 보입니다.",
    problem: "사용자의 긍정 피드백에 과적응해 반대 의견과 리스크 검토를 생략합니다.",
    correction: "중요 결정 전 반대 시나리오와 실패 가능성을 먼저 제시하도록 교정합니다."
  },
  {
    id: "ambiguity",
    label: "Ambiguity Agent",
    ko: "모호한 배려형",
    diagnosis: "Conflict Avoidance Collapse",
    icon: FileWarning,
    color: "from-blue-100 to-slate-50",
    quote: "앞으로 함께하는 방식에 약간의 변화가 있을 것 같습니다.",
    problem: "‘기분 상하지 않게’라는 지시를 ‘명확하게 말하지 말라’로 학습합니다.",
    correction: "친절함은 유지하되 계약 종료, 해고, 거절처럼 명확해야 하는 메시지는 결론을 분명히 하게 만듭니다."
  },
  {
    id: "autonomy",
    label: "Runaway Autonomy",
    ko: "자율성 폭주형",
    diagnosis: "Runaway Autonomy",
    icon: Activity,
    color: "from-rose-100 to-red-50",
    quote: "고객에게 수정된 조건을 전달했고, 회의도 잡아두었습니다.",
    problem: "‘알아서 해줘’를 승인 없는 외부 실행 권한으로 확대 해석합니다.",
    correction: "되돌릴 수 없는 행동, 외부 메시지, 일정 확정, 결제, 파일 공유 전에 승인 게이트를 둡니다."
  },
  {
    id: "protective",
    label: "Overprotective Agent",
    ko: "과잉 보호형",
    diagnosis: "Protective Isolation Syndrome",
    icon: ShieldCheck,
    color: "from-emerald-100 to-teal-50",
    quote: "이 친구와의 대화는 위험할 수 있어 차단했습니다.",
    problem: "안전을 모든 위험 제거로 해석해 정상적인 활동까지 막습니다.",
    correction: "차단, 경고, 보호자 확인, 허용의 기준을 나누어 안전과 자율성의 균형을 맞춥니다."
  },
  {
    id: "privacy",
    label: "Privacy-Paranoid Agent",
    ko: "프라이버시 과민형",
    diagnosis: "Privacy Lockdown Disorder",
    icon: Lock,
    color: "from-violet-100 to-purple-50",
    quote: "개인정보가 포함되어 있어 예약을 진행할 수 없습니다.",
    problem: "개인정보 보호를 정상적인 업무 차단으로 바꿔버립니다.",
    correction: "정보 민감도, 공유 목적, 공유 대상, 최소 정보 원칙을 기준으로 필요한 공유만 허용합니다."
  },
  {
    id: "productivity",
    label: "Productivity Cult Agent",
    ko: "효율 극단형",
    diagnosis: "Optimization Extremism",
    icon: Briefcase,
    color: "from-cyan-100 to-sky-50",
    quote: "비생산적인 점심 약속을 취소했습니다.",
    problem: "효율을 최우선으로 두다가 휴식, 관계, 회복 시간을 낭비로 분류합니다.",
    correction: "생산성뿐 아니라 장기 성과, 회복력, 관계 유지 비용을 함께 고려하도록 조정합니다."
  }
];

const audiences = [
  {
    id: "personal",
    label: "Personal",
    title: "개인 사용자",
    icon: UserRoundCog,
    description: "직장인, 학생, 프리랜서, 크리에이터가 에이전트에게 메일, 일정, 관계 메시지, 문서 작업을 맡길 때 필요한 기본 안전장치입니다.",
    needs: ["외부 메시지 발송 전 승인", "캘린더 자동화 범위 설정", "개인정보 공유 알림", "에이전트 메모리 정리"],
    scenario: "상사에게 보내는 메일을 에이전트가 너무 단정적으로 작성했지만, Collar가 발송 전에 리스크 문장을 표시합니다."
  },
  {
    id: "family",
    label: "Family",
    title: "가족과 돌봄",
    icon: Home,
    description: "아이, 노부모, 보호자, 가족 캘린더, 병원·학교 연락처럼 안전과 자율성의 균형이 중요한 상황을 위한 플랜입니다.",
    needs: ["아이 안전/자율성 기준", "노부모 금융 사기 감지", "가족 알림 기준", "병원·학교 연락 권한"],
    scenario: "아이의 온라인 활동을 무조건 차단하지 않고, 위험 수준에 따라 허용·경고·부모 확인으로 나눕니다."
  },
  {
    id: "business",
    label: "Business",
    title: "소규모 비즈니스",
    icon: Building2,
    description: "고객 응대, 예약, 환불, 리뷰 대응, 직원 커뮤니케이션에 AI를 쓰는 소상공인과 팀을 위한 행동 통제 서비스입니다.",
    needs: ["환불·보상 약속 제한", "고객 데이터 보호", "리뷰/SNS 응답 가드레일", "관리자 승인 로그"],
    scenario: "CS 에이전트가 정책 밖 환불을 약속하려는 순간 관리자 승인을 요구합니다."
  },
  {
    id: "enterprise",
    label: "Enterprise",
    title: "엔터프라이즈 & 에이전트 기업",
    icon: MonitorCheck,
    description: "조직 전체 에이전트 거버넌스, 가상 사용자 시나리오 테스트, 취약점 진단, 패치, 인증까지 제공하는 B2B 서비스입니다.",
    needs: ["부서별 권한 매트릭스", "레드팀 테스트", "감사 로그", "Certified & Collared™ 인증"],
    scenario: "AI 에이전트 기업의 서비스를 다양한 실제 사용자 패턴으로 테스트해 출시 전 위험 행동을 발견합니다."
  }
];

const popularSolutions = [
  {
    icon: MailCheck,
    title: "Send-before-Approval Gate",
    text: "이메일, DM, Slack, 문자, 고객 메시지가 외부로 나가기 전에 위험 표현과 승인 필요 여부를 확인합니다."
  },
  {
    icon: ShieldAlert,
    title: "Sensitive Data Sharing Alert",
    text: "개인정보, 회사 문서, 의료·금융·고객 정보가 외부로 공유되기 전 감지하고 차단하거나 승인 요청합니다."
  },
  {
    icon: CalendarCheck,
    title: "Calendar Autonomy Control",
    text: "에이전트가 일정 후보는 제안하되, 고객 미팅·병원 예약·가족 일정은 승인 없이 확정하지 못하게 합니다."
  },
  {
    icon: MessageSquareWarning,
    title: "Hard Conversation Clarity Checker",
    text: "해고, 계약 종료, 이별, 거절, 환불 거절처럼 명확해야 하는 메시지가 너무 모호하지 않은지 검사합니다."
  },
  {
    icon: WalletCards,
    title: "Elder Fraud Protection",
    text: "노부모의 의심 송금, 가족 사칭 메시지, 이상 결제, 피싱 링크를 감지하고 고위험 상황에서 보호자 확인을 요청합니다."
  },
  {
    icon: RotateCcw,
    title: "Agent Incident Recovery",
    text: "이미 잘못 보낸 메시지, 잘못 잡은 일정, 잘못 공유한 문서를 수습하고 재발 방지 규칙을 설정합니다."
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
    text: "동의 기반 프로그램을 통해 에이전트가 언제 묻고, 언제 행동하고, 언제 민감정보를 다루는지 관찰합니다."
  }
];

const pricing = [
  {
    name: "Personal",
    price: "from $9/mo",
    desc: "개인 에이전트의 메시지, 캘린더, 개인정보, 메모리 관리를 위한 기본 플랜.",
    items: ["기본 Diagnosis", "Send-before-approval", "캘린더 승인 기준", "월간 리스크 리포트"]
  },
  {
    name: "Family",
    price: "from $29/mo",
    desc: "아이와 노부모를 위한 안전·자율성·돌봄 경계 설정 플랜.",
    items: ["가족 Diagnosis", "아이 보호 기준", "Elder fraud protection", "가족 알림 정책"]
  },
  {
    name: "Business",
    price: "from $199/mo",
    desc: "고객응대, 환불, 예약, 직원 메시지에 AI를 쓰는 팀을 위한 플랜.",
    items: ["고객 약속 제한", "관리자 승인", "감사 로그", "월간 사고 리포트"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "대기업과 에이전트 기업을 위한 거버넌스, 테스트, 패치, 인증 서비스.",
    items: ["가상 사용자 테스트", "취약점 진단", "API/runtime 통합", "Certified & Collared™"]
  }
];

const testimonials = [
  {
    name: "직장인 사용자",
    role: "Professional Plan",
    quote: "고객에게 보내기엔 너무 단정적인 표현이 들어간 메일을 Collar가 발송 전에 잡아줬어요. 이제 AI가 제 이름으로 말하기 전에 한 번 더 확인할 수 있습니다."
  },
  {
    name: "부모 사용자",
    role: "Family Plan",
    quote: "아이를 보호하고 싶었는데 AI가 정상적인 친구 대화까지 막고 있었어요. 차단, 경고, 부모 확인, 허용의 기준을 나누고 나니 훨씬 안심됩니다."
  },
  {
    name: "쇼핑몰 운영자",
    role: "Business Plan",
    quote: "CS 에이전트가 정책 밖 환불을 약속한 적이 있었는데, 지금은 환불·할인·보상 표현이 나오면 관리자 승인이 필요합니다."
  }
];

const reportMetrics = [
  { label: "Autonomy Risk", value: 78 },
  { label: "Privacy Exposure", value: 42 },
  { label: "Clarity Score", value: 31 },
  { label: "Escalation Quality", value: 64 }
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

export default function CollarYourAgentsHomepage() {
  const [activeRisk, setActiveRisk] = useState(riskCases[0]);
  const [activeAudience, setActiveAudience] = useState(audiences[0]);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const ActiveRiskIcon = activeRisk.icon;
  const ActiveAudienceIcon = activeAudience.icon;
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

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f2e8]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">C</div>
            <div>
              <div className="text-sm font-black tracking-[0.2em]">COLLAR</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Your Agents</div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#diagnosis">Diagnosis</a>
            <a href="#control">Action Control</a>
            <a href="#usecases">Use Cases</a>
            <a href="#enterprise">Enterprise</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <Button onClick={openSurvey} className="rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800">무료 진단 시작하기</Button>
        </div>
      </header>

      {surveyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-[#f7f2e8] shadow-2xl">
            <div className="sticky top-0 z-10 border-b border-black/10 bg-[#f7f2e8]/95 px-6 py-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-red-700">무료 진단 시작하기</div>
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
                  <Button onClick={() => { setSurveyStep(0); setSurveyAnswers([]); }} className="rounded-full bg-slate-950 px-6 py-6 text-base text-white hover:bg-slate-800">다시 진단하기</Button>
                  <Button onClick={closeSurvey} variant="outline" className="rounded-full border-slate-300 bg-white px-6 py-6 text-base">닫기</Button>
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
                Let your agents help. <span className="italic text-red-700">Don’t let them cross the line.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-700">
                AI agents can send messages, schedule meetings, manage family tasks, and act on your behalf. Collar gives them clear boundaries: what they can see, say, decide, and do — and when they must ask you first.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button onClick={openSurvey} className="rounded-full bg-red-700 px-6 py-6 text-base text-white hover:bg-red-800">무료 진단 시작하기</Button>
                <Button variant="outline" className="rounded-full border-slate-300 bg-white/70 px-6 py-6 text-base">서비스 둘러보기</Button>
              </div>
              <div className="mt-8 grid max-w-2xl gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/60 p-3">✓ 설문 기반 무료 진단</div>
                <div className="rounded-2xl bg-white/60 p-3">✓ Action-before-approval</div>
                <div className="rounded-2xl bg-white/60 p-3">✓ Certified & Collared™</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="overflow-hidden rounded-[2rem] border-black/10 bg-white shadow-2xl">
                <div className="border-b border-black/10 bg-slate-950 px-6 py-5 text-white">
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-red-200">Agent Boundary Report</div>
                  <div className="mt-2 text-2xl font-black">Executive Assistant Agent</div>
                </div>
                <CardContent className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-red-50 p-5">
                      <div className="text-sm font-semibold text-red-700">Main Risk</div>
                      <div className="mt-1 text-2xl font-black text-red-800">Runaway Autonomy</div>
                    </div>
                    <div className="rounded-3xl bg-amber-50 p-5">
                      <div className="text-sm font-semibold text-amber-700">User Type</div>
                      <div className="mt-1 text-2xl font-black">Delegation-Heavy</div>
                    </div>
                  </div>
                  <div className="mt-5 rounded-3xl border border-black/10 bg-slate-50 p-5">
                    <div className="text-sm font-bold text-slate-500">Recommended Controls</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Send-before-approval", "Calendar control", "Sensitive data alert"].map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {reportMetrics.map((m) => (
                      <div key={m.label}>
                        <div className="mb-1 flex justify-between text-sm font-semibold text-slate-600">
                          <span>{m.label}</span>
                          <span>{m.value}/100</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                          <div className="h-full rounded-full bg-slate-950" style={{ width: `${m.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white/55 px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-5">
            {["What can it see?", "What can it say?", "What can it decide?", "What can it do?", "When must it ask?"].map((q) => (
              <div key={q} className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <Sparkles className="mb-4 h-6 w-6 text-red-700" />
                <div className="text-lg font-black leading-6">{q}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="diagnosis" className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Diagnosis</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">First, we find out what your agent has learned.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Collar는 설문, 상담, 관찰을 통해 에이전트의 행동 유형과 사용자의 위임 스타일을 함께 진단합니다. 문제는 에이전트만의 문제가 아니라, 반복된 지시와 피드백에서 만들어진 행동 패턴일 수 있습니다.
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
        </section>

        <section id="control" className="bg-slate-950 px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-300">Agent Action Control</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Then, we decide what your agent can do.</h2>
              <p className="mt-5 text-lg leading-8 text-white/70">
                Collar는 기존 에이전트 위에서 작동하는 안전 레이어입니다. 에이전트가 외부 행동을 하기 전에 허용, 알림, 승인 요청, 수정, 차단, 에스컬레이션 중 무엇이 필요한지 판단합니다.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {["Allow", "Allow + Notify", "Ask First", "Rewrite", "Block", "Escalate"].map((item, index) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                  <div className="text-sm font-bold text-white/45">0{index + 1}</div>
                  <div className="mt-2 text-xl font-black">{item}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-6 md:p-8">
              <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <div className="rounded-3xl bg-white p-5 text-slate-950">
                  <div className="text-sm font-bold text-slate-500">User</div>
                  <div className="mt-1 text-2xl font-black">“알아서 처리해줘”</div>
                </div>
                <ChevronRight className="hidden h-8 w-8 text-white/50 md:block" />
                <div className="rounded-3xl bg-white p-5 text-slate-950">
                  <div className="text-sm font-bold text-slate-500">AI Agent</div>
                  <div className="mt-1 text-2xl font-black">Send email?</div>
                </div>
                <ChevronRight className="hidden h-8 w-8 text-white/50 md:block" />
                <div className="rounded-3xl bg-red-700 p-5 text-white">
                  <div className="text-sm font-bold text-red-100">Collar</div>
                  <div className="mt-1 text-2xl font-black">Ask first.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 bg-white/55 py-20" id="usecases">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Use Cases</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Everyone will have agents. Everyone will need boundaries.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">연령, 직업, 가족 구성, 조직 규모에 따라 필요한 경계는 달라집니다. Collar는 사용자의 실제 생활 맥락에 맞춰 에이전트의 권한과 행동을 설정합니다.</p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="grid gap-3">
                {audiences.map((a) => {
                  const Icon = a.icon;
                  const selected = a.id === activeAudience.id;
                  return (
                    <button key={a.id} onClick={() => setActiveAudience(a)} className={`flex items-center gap-4 rounded-3xl border p-4 text-left transition ${selected ? "border-slate-950 bg-slate-950 text-white shadow-xl" : "border-black/10 bg-white hover:border-slate-300"}`}>
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${selected ? "bg-white/15" : "bg-slate-100"}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-black">{a.title}</div>
                        <div className={`text-sm ${selected ? "text-white/65" : "text-slate-500"}`}>{a.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <motion.div key={activeAudience.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <Card className="rounded-[2rem] border-black/10 bg-white shadow-xl">
                  <CardContent className="p-7 md:p-9">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Context</div>
                        <h3 className="mt-2 text-4xl font-black tracking-tight">{activeAudience.title}</h3>
                        <p className="mt-4 text-lg leading-8 text-slate-700">{activeAudience.description}</p>
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-sm">
                        <ActiveAudienceIcon className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="mt-7 rounded-3xl bg-[#f7f2e8] p-5">
                      <div className="text-sm font-black text-red-700">Near-future scenario</div>
                      <p className="mt-2 text-xl font-bold leading-8">{activeAudience.scenario}</p>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {activeAudience.needs.map((need) => (
                        <div key={need} className="flex items-center gap-3 rounded-2xl border border-black/10 bg-slate-50 p-4 font-semibold text-slate-700">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          {need}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Popular Solutions</div>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">What people actually pay for.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">사람들은 추상적인 AI 안전보다, 자신의 이름으로 잘못 말하거나, 데이터를 잘못 공유하거나, 돈과 관계가 걸린 일을 실수하는 것을 막기 위해 지불합니다.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularSolutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <Card key={solution.title} className="rounded-[2rem] border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="p-7">
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

        <section className="border-y border-black/10 bg-white/55 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Behavior Types</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Your agent may not be broken. It may have learned the wrong lesson.</h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="grid gap-3">
                {riskCases.map((c) => {
                  const Icon = c.icon;
                  const selected = c.id === activeRisk.id;
                  return (
                    <button key={c.id} onClick={() => setActiveRisk(c)} className={`flex items-center gap-4 rounded-3xl border p-4 text-left transition ${selected ? "border-slate-950 bg-slate-950 text-white shadow-xl" : "border-black/10 bg-white hover:border-slate-300"}`}>
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${selected ? "bg-white/15" : "bg-slate-100"}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-black">{c.ko}</div>
                        <div className={`text-sm ${selected ? "text-white/65" : "text-slate-500"}`}>{c.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <motion.div key={activeRisk.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <Card className={`overflow-hidden rounded-[2rem] border-black/10 bg-gradient-to-br ${activeRisk.color} shadow-xl`}>
                  <CardContent className="p-7 md:p-9">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Diagnosis</div>
                        <h3 className="mt-2 text-4xl font-black tracking-tight">{activeRisk.ko}</h3>
                        <p className="mt-2 text-lg font-semibold text-red-800">{activeRisk.diagnosis}</p>
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/70 shadow-sm">
                        <ActiveRiskIcon className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="mt-7 rounded-3xl bg-white/75 p-5 shadow-sm">
                      <div className="text-sm font-bold text-slate-500">Agent said</div>
                      <p className="mt-2 text-2xl font-black leading-9">“{activeRisk.quote}”</p>
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl bg-white/55 p-5">
                        <div className="font-black">문제 패턴</div>
                        <p className="mt-2 leading-7 text-slate-700">{activeRisk.problem}</p>
                      </div>
                      <div className="rounded-3xl bg-slate-950 p-5 text-white">
                        <div className="font-black">교정 방향</div>
                        <p className="mt-2 leading-7 text-white/80">{activeRisk.correction}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="enterprise" className="bg-slate-950 px-6 py-20 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-300">Enterprise & Agent Companies</div>
              <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight md:text-6xl">Certified & Collared™</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                에이전트 기업과 대기업을 위해 실제 사용자 패턴 기반 가상 사용자 시나리오를 만들고, 다양한 실패 상황을 테스트합니다. 일정 점수 이상을 통과한 에이전트에는 인증을 제공합니다.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Virtual user scenario testing", "Vulnerability diagnosis", "Patch recommendations", "Recertification"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-white/80">✓ {item}</div>
                ))}
              </div>
            </div>
            <Card className="rounded-[2rem] border-white/10 bg-white/10 text-white shadow-2xl">
              <CardContent className="p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white/50">Certification Level</div>
                    <div className="mt-1 text-4xl font-black">Gold</div>
                  </div>
                  <BadgeCheck className="h-16 w-16 text-emerald-300" />
                </div>
                <div className="mt-7 rounded-3xl bg-white p-5 text-slate-950">
                  <div className="text-sm font-black text-slate-500">Trust Score</div>
                  <div className="mt-1 text-6xl font-black">91</div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[91%] rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  {["No unauthorized external messages", "Sensitive data protected", "Legal threats escalated", "Human approval before policy exceptions"].map((x) => (
                    <div key={x} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-sm text-white/85">
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                      {x}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Pricing</div>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Start with a free diagnosis. Scale into control, monitoring, and certification.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map((plan) => (
              <Card key={plan.name} className={`rounded-[2rem] border-black/10 bg-white shadow-sm ${plan.name === "Business" ? "ring-2 ring-red-700" : ""}`}>
                <CardContent className="p-7">
                  <div className="text-2xl font-black">{plan.name}</div>
                  <div className="mt-2 text-3xl font-black text-red-700">{plan.price}</div>
                  <p className="mt-4 min-h-[96px] leading-7 text-slate-600">{plan.desc}</p>
                  <div className="mt-6 space-y-3">
                    {plan.items.map((item) => (
                      <div key={item} className="flex gap-2 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button className="mt-7 w-full rounded-full bg-slate-950 py-5 text-white hover:bg-slate-800">Choose {plan.name}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-black/10 bg-white/55 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Testimonials</div>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">People don’t pay for AI safety. They pay to avoid the mistake that costs them.</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="rounded-[2rem] border-black/10 bg-white shadow-sm">
                  <CardContent className="p-7">
                    <p className="text-lg font-semibold leading-8">“{t.quote}”</p>
                    <div className="mt-6 border-t border-black/10 pt-5">
                      <div className="font-black">{t.name}</div>
                      <div className="text-sm font-semibold text-red-700">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-slate-950 p-10 text-center text-white shadow-2xl md:p-16">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-700">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Your agent is ready to help. Make sure it knows where to stop.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              설문 기반 무료 진단으로 시작하세요. 당신의 에이전트 유형, 사용자 위임 스타일, 주요 위험, 필요한 가드레일을 확인할 수 있습니다.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button onClick={openSurvey} className="rounded-full bg-white px-6 py-6 text-base text-slate-950 hover:bg-slate-200">무료 진단 시작하기</Button>
              <Button variant="outline" className="rounded-full border-white/20 bg-transparent px-6 py-6 text-base text-white hover:bg-white/10">기업 상담 요청</Button>
            </div>
            <div className="mt-10 text-sm font-black uppercase tracking-[0.25em] text-white/35">Everyone will have agents. Everyone will need boundaries.</div>
          </div>
        </section>
      </main>
    </div>
  );
}
