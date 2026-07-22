import React, { useState } from 'react';
import { X, User, Calendar, Building, MessageSquare, Send, Bot, Sparkles, Edit3 } from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from './Badges';
import type { TicketStatus } from '../types/ticket';

export const TicketDetailModal: React.FC = () => {
  const { tickets, selectedTicketId, setSelectedTicketId, updateTicketStatus, addComment, generateAiTroubleshooting, setEditingTicket } = useTickets();
  const [newComment, setNewComment] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const ticket = tickets.find(t => t.id === selectedTicketId);
  if (!ticket) return null;

  const handleClose = () => setSelectedTicketId(null);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(ticket.id, newComment);
    setNewComment('');
  };

  const handleAiGenerate = async () => {
    setIsGeneratingAi(true);
    await generateAiTroubleshooting(ticket.id);
    setIsGeneratingAi(false);
  };

  const created = new Date(ticket.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-edge rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]" style={{ boxShadow: 'var(--shadow-lg)' }}>

        {/* Header */}
        <div className="px-6 py-4 border-b border-edge flex items-center justify-between sticky top-0 z-10 bg-surface/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-bold text-accent border border-accent/30 bg-transparent px-2.5 py-1 rounded">
              {ticket.ticketNumber}
            </span>
            <CategoryBadge category={ticket.category} />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { handleClose(); setEditingTicket(ticket); }}
              className="px-3 py-1.5 text-xs text-on-surface hover:text-on-base bg-surface-alt hover:bg-elevated border border-edge rounded-lg flex items-center gap-1.5 transition-colors">
              <Edit3 className="w-3.5 h-3.5" /><span>Edit</span>
            </button>
            <button onClick={handleClose} className="p-1.5 text-muted hover:text-on-base hover:bg-surface-alt rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Title & Status */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-lg font-bold text-on-base leading-snug">{ticket.title}</h2>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusBadge status={ticket.status} />
                <select value={ticket.status} onChange={(e) => updateTicketStatus(ticket.id, e.target.value as TicketStatus)}
                  className="bg-input text-xs text-on-surface border border-edge rounded px-2 py-1 focus:outline-none cursor-pointer">
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-on-surface bg-surface-alt p-4 rounded-xl border border-edge-subtle leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-elevated/50 p-4 rounded-xl border border-edge-subtle text-xs">
            {[
              { label: 'Reporter', value: ticket.reporter, Icon: User },
              { label: 'Department', value: ticket.department, Icon: Building },
              { label: 'Assigned', value: ticket.assignedPerson || 'Unassigned', Icon: User, accent: true },
              { label: 'Created', value: created, Icon: Calendar },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-muted text-[10px] uppercase font-semibold mb-1">{m.label}</div>
                <div className="text-on-base font-medium flex items-center gap-1.5">
                  <m.Icon className={`w-3.5 h-3.5 ${m.accent ? 'text-accent' : 'text-muted'}`} />
                  <span className="truncate">{m.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI box */}
          <div className="bg-accent-ghost border border-accent/15 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-accent/15 text-accent"><Bot className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-xs font-bold text-on-base">AI Support Assistant</h4>
                  <p className="text-[11px] text-muted">Prompt-driven troubleshooting workflow</p>
                </div>
              </div>
              <button onClick={handleAiGenerate} disabled={isGeneratingAi}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent bg-accent/10 hover:bg-accent/15 border border-accent/25 rounded-lg transition-all disabled:opacity-50">
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAi ? 'Analyzing...' : ticket.aiTroubleshootingDraft ? 'Regenerate' : 'Generate Plan'}</span>
              </button>
            </div>
            {ticket.aiTroubleshootingDraft ? (
              <div className="mt-3 p-3 bg-surface rounded-lg border border-edge text-xs font-mono text-on-base whitespace-pre-line leading-relaxed">
                {ticket.aiTroubleshootingDraft}
              </div>
            ) : (
              <p className="text-xs text-muted italic mt-1">Click "Generate Plan" to create AI troubleshooting steps.</p>
            )}
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent" />
              <span>Activity Log ({ticket.comments.length})</span>
            </h3>

            <div className="space-y-3 mb-4">
              {ticket.comments.length === 0 ? (
                <div className="text-center py-6 text-muted text-xs bg-surface-alt rounded-xl border border-edge">
                  No comments yet.
                </div>
              ) : (
                ticket.comments.map((c) => {
                  const isStaff = c.role === 'IT Staff';
                  const isSystem = c.role === 'System';
                  const time = new Date(c.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                  return (
                    <div key={c.id}
                      className={`p-3.5 rounded-xl border text-xs ${
                        isSystem ? 'bg-surface-alt border-edge-subtle text-muted italic'
                        : isStaff ? 'bg-accent-ghost border-accent/10 text-on-base'
                        : 'bg-surface-alt border-edge text-on-base'
                      }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-on-base">{c.author}</span>
                          <span className={`text-[10px] px-1.5 rounded border ${
                            isStaff ? 'text-accent border-accent/20 bg-accent/8 font-medium'
                            : isSystem ? 'text-muted border-edge bg-surface-alt'
                            : 'text-on-surface border-edge bg-surface-alt'
                          }`}>{c.role}</span>
                        </div>
                        <span className="text-[10px] text-muted">{time}</span>
                      </div>
                      <p className="leading-relaxed mt-1">{c.content}</p>
                    </div>
                  );
                })
              )}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add IT note or progress comment..."
                className="flex-1 bg-input text-on-base text-xs px-3.5 py-2.5 rounded-lg border border-edge focus:outline-none focus:border-accent placeholder:text-muted" />
              <button type="submit" disabled={!newComment.trim()}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-accent hover:bg-accent-hover disabled:opacity-40 rounded-lg flex items-center gap-1.5 transition-colors">
                <Send className="w-3.5 h-3.5" /><span>Add</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
