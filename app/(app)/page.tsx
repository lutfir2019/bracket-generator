"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Trophy,
  Zap,
  Users,
  Target,
  Clock,
  Star,
  Play,
  CheckCircle,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Generate brackets in seconds",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Up to 64 Players",
      description: "Support for large tournaments",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Multiple Formats",
      description: "Various tournament styles",
    },
  ];

  const stats = [
    {
      label: "Tournaments Created",
      value: "10,000+",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      label: "Active Users",
      value: "2,500+",
      icon: <Users className="h-4 w-4" />,
    },
    {
      label: "Matches Played",
      value: "50,000+",
      icon: <Target className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center flex-wrap justify-center gap-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <Trophy className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bracket Generator
              </h1>
              <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                Professional Tournament Tool
              </Badge>
            </div>
          </div>

          <p className="text-xl max-w-2xl mx-auto mb-8">
            Create and visualize tournament brackets with ease. Perfect for
            sports events, gaming tournaments, and competitive matches.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card backdrop-blur-sm rounded-lg p-4 shadow-sm border-0"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-blue-600">{stat.icon}</div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tournament Types */}
        <div id="tournament-types" className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Choose Your Tournament Format
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select the perfect format for your competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Knockout Tournament */}
            <Card className="bg-secondary backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                        Knockout Tournament
                      </CardTitle>
                      <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Most Popular
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      ⚡
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Single elimination format where losers are immediately
                  eliminated. Perfect for quick tournaments with clear winners.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Single elimination format
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Quick tournament completion
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      2-64 participants
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      4.9/5 rating
                    </span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105"
                    onClick={() => router.push("/knockout")}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Tournament
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Round Robin */}
            <Card className="bg-secondary backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                        Round Robin
                      </CardTitle>
                      <Badge className="mt-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      🔄
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Every participant plays against every other participant. Ideal
                  for leagues and comprehensive competitions.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      All vs all format
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Detailed statistics
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Fair competition
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">
                      In Development
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    disabled
                    className="bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                </div>
              </CardContent>

              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] pointer-events-none" />
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 max-w-2xl mx-auto text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Tournament?
            </h3>
            <p className="mb-6 text-blue-100">
              Join thousands of organizers who trust our platform for their
              competitions.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => router.push("#tournament-types")}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Create Tournament Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
