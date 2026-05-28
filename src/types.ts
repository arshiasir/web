/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EngineerMode = 'MOBILE' | 'BACKEND';

export interface TechItem {
  name: string;
  glowColor: string;
  mode: EngineerMode | 'BOTH';
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
  mode: EngineerMode | 'BOTH';
  metrics?: { label: string; value: string }[];
  accentColor: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  architectureTags: string[];
  mode: EngineerMode | 'BOTH';
  accentColor: string;
  screenshotPrompt?: string; // Prompt used to explain visual structure
}

export interface ArchitectureNode {
  id: string;
  label: string;
  subLabel: string;
  layer: 'FRONTEND' | 'GATEWAY' | 'AUTH' | 'REALTIME' | 'DATABASE' | 'CACHING';
  modeAccent: {
    mobile: string;
    backend: string;
  };
}
