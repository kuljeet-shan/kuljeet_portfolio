"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  proficiency: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

    const toggleItem = (id: number) => {
      setExpandedItems((prev) => {
        const newState = { ...prev };
        Object.keys(newState).forEach((key) => {
          if (parseInt(key) !== id) {
            newState[parseInt(key)] = false;
          }
        });

        newState[id] = !prev[id];

        if (!prev[id]) {
          setActiveNodeId(id);
          setAutoRotate(false);

          const relatedItems = getRelatedItems(id);
          const newPulseEffect: Record<number, boolean> = {};
          relatedItems.forEach((relId) => {
            newPulseEffect[relId] = true;
          });
          setPulseEffect(newPulseEffect);

          // Force immediate re-render to apply transition classes before moving
          setTimeout(() => {
            centerViewOnNode(id);
          }, 50);
        } else {
          setActiveNodeId(null);
          setAutoRotate(true);
          setPulseEffect({});
        }

        return newState;
      });
    };

    useEffect(() => {
      let requestRef: number;
      let lastTime: number | null = null;
  
      const animate = (time: number) => {
        if (lastTime !== null) {
          const deltaTime = Math.min(time - lastTime, 100);
          if (autoRotate && viewMode === "orbital") {
            setRotationAngle((prev) => (prev + 0.005 * deltaTime) % 360);
            requestRef = requestAnimationFrame(animate);
          }
        } else {
          lastTime = time;
          requestRef = requestAnimationFrame(animate);
        }
        lastTime = time;
      };
  
      if (autoRotate && viewMode === "orbital") {
        requestRef = requestAnimationFrame(animate);
      }
  
      return () => {
        if (requestRef) {
          cancelAnimationFrame(requestRef);
        }
      };
    }, [autoRotate, viewMode]);

    const centerViewOnNode = (nodeId: number) => {
      if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

      const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
      const totalNodes = timelineData.length;
      const targetAngle = (nodeIndex / totalNodes) * 360;

      // Use a small timeout to let the autoRotate cleanup finish and transition enable
      setTimeout(() => {
        setRotationAngle(270 - targetAngle);
      }, 10);
    };

  const [dimensions, setDimensions] = useState({ radius: 200, size: 400 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: 120, size: 260 });
      } else if (width < 768) {
        setDimensions({ radius: 150, size: 320 });
      } else {
        setDimensions({ radius: 200, size: 400 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = dimensions.radius;
    const radian = (angle * Math.PI) / 180;

      const x = radius * Math.cos(radian) + centerOffset.x;
      const y = radius * Math.sin(radian) + centerOffset.y;

      const zIndex = Math.round(100 + 50 * Math.cos(radian));
      const opacity = Math.max(
        0.4,
        Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
      );

      return { x, y, angle, zIndex, opacity };
    };

    const getRelatedItems = (itemId: number): number[] => {
      const currentItem = timelineData.find((item) => item.id === itemId);
      return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number): boolean => {
      if (!activeNodeId) return false;
      const relatedItems = getRelatedItems(activeNodeId);
      return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status: TimelineItem["status"]): string => {
      switch (status) {
        case "completed":
          return "text-white bg-black border-white";
        case "in-progress":
          return "text-black bg-white border-black";
        case "pending":
          return "text-white bg-black/40 border-white/50";
        default:
          return "text-white bg-black/40 border-white/50";
      }
    };

    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-transparent transition-colors duration-500 overflow-hidden"
        ref={containerRef}
        onClick={handleContainerClick}
      >
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <div
              className="absolute w-full h-full flex items-center justify-center pointer-events-none"
              ref={orbitRef}
              style={{
                perspective: "1000px",
                transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
              }}
            >
                {/* Central spinning circle - improved animation */}
                <div 
                  className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary via-primary-glow to-accent animate-spin-slow flex items-center justify-center z-10 shadow-[0_0_30px_rgba(var(--primary-glow),0.3)]"
                  style={{ animationDuration: '10s' }}
                >
                  <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-primary/20 animate-orbital-ping opacity-70"></div>
                  <div
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-primary/10 animate-orbital-ping opacity-50"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-white/80 backdrop-blur-md shadow-inner"></div>
                </div>

                {/* Orbital path */}
                <div 
                  className="absolute rounded-full border border-black/5 dark:border-white/5 shadow-inner"
                  style={{ width: `${dimensions.size}px`, height: `${dimensions.size}px` }}
                ></div>
                <div 
                  className="absolute rounded-full border border-black/10 dark:border-white/10"
                  style={{ width: `${dimensions.size - 2}px`, height: `${dimensions.size - 2}px` }}
                ></div>
                
                {timelineData.map((item, index) => {
                const position = calculateNodePosition(index, timelineData.length);
                const isExpanded = expandedItems[item.id];
                const isRelated = isRelatedToActive(item.id);
                const isPulsing = pulseEffect[item.id];
                const Icon = item.icon;

                const nodeStyle = {
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                };

                  return (
                    <div
                      key={item.id}
                      ref={(el) => (nodeRefs.current[item.id] = el)}
                      className={`absolute ${autoRotate ? "" : "transition-transform duration-700 ease-in-out"} cursor-pointer pointer-events-auto flex flex-col items-center`}
                      style={nodeStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItem(item.id);
                      }}
                    >
                    <div
                      className={`absolute rounded-full ${
                        isPulsing ? "animate-orbital-pulse duration-1000" : ""
                      }`}
                        style={{
                          background: `radial-gradient(circle, rgba(var(--primary-glow), 0.15) 0%, transparent 70%)`,
                          width: `${(item.proficiency * 0.5 + 40) * (dimensions.radius / 200)}px`,
                          height: `${(item.proficiency * 0.5 + 40) * (dimensions.radius / 200)}px`,
                          transform: 'translate(0, 0)',
                        }}
                    ></div>

                    <div
                      className={`
                      w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                      ${
                        isExpanded
                          ? "bg-primary text-primary-foreground"
                          : isRelated
                          ? "bg-primary/40 text-primary-foreground backdrop-blur-sm"
                          : "bg-white dark:bg-[#1a1c1e] text-black dark:text-white"
                      }
                      border-2 
                      ${
                        isExpanded
                          ? "border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                          : isRelated
                          ? "border-primary animate-orbital-pulse"
                          : "border-black/10 dark:border-white/20"
                      }
                      transition-all duration-300 transform
                      ${isExpanded ? "scale-125 sm:scale-150" : "hover:scale-110"}
                    `}
                    >
                      <Icon size={14} className="sm:size-16" />
                    </div>

                    <div
                      className={`
                      mt-2 whitespace-nowrap
                      text-[8px] sm:text-[10px] font-bold tracking-widest uppercase
                      transition-all duration-300
                      ${isExpanded ? "text-primary scale-110" : "text-black/50 dark:text-white/50"}
                    `}
                    >
                      {item.title}
                    </div>

                    {isExpanded && (
                      <Card className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-[280px] sm:w-64 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl border-black/10 dark:border-white/20 shadow-2xl overflow-visible z-50">

                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/50"></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`px-2 text-[9px] font-bold ${getStatusStyles(
                              item.status
                            )}`}
                          >
                            {item.status === "completed"
                              ? "COMPLETE"
                              : item.status === "in-progress"
                              ? "ACTIVE"
                              : "PLANNING"}
                          </Badge>
                          <span className="text-[10px] font-mono text-black/40 dark:text-white/40">
                            {item.date}
                          </span>
                        </div>
                        <CardTitle className="text-sm mt-2 font-bold text-black dark:text-white">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs text-black/70 dark:text-white/80">
                        <p className="leading-relaxed">{item.content}</p>

                        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                          <div className="flex justify-between items-center text-[10px] mb-1 font-bold uppercase tracking-tight">
                              <span className="flex items-center text-primary">
                                <Zap size={10} className="mr-1" />
                                Academic Impact Score
                              </span>
                            <span className="font-mono text-primary">{item.proficiency}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                              style={{ width: `${item.proficiency}%` }}
                            ></div>
                          </div>
                        </div>

                        {item.relatedIds.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10">
                            <div className="flex items-center mb-2">
                              <Link size={10} className="text-black/50 dark:text-white/50 mr-1" />
                              <h4 className="text-[10px] uppercase tracking-wider font-bold text-black/50 dark:text-white/50">
                                Research Connections
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relatedId) => {
                                const relatedItem = timelineData.find(
                                  (i) => i.id === relatedId
                                );
                                return (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center h-6 px-2 py-0 text-[10px] rounded-full border-black/10 dark:border-white/10 bg-transparent hover:bg-primary/10 text-black/70 dark:text-white/70 hover:text-primary transition-all font-bold"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {relatedItem?.title}
                                    <ArrowRight
                                      size={8}
                                      className="ml-1 opacity-50"
                                    />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
