import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertCircle } from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import type { TicketCategory, TicketPriority, TicketStatus } from '../types/ticket';

export const TicketFormModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, editingTicket, setEditingTicket, addTicket, updateTicket } = useTickets();

  const isOpen = isAddModalOpen || !!editingTicket;
  const isEditing = !!editingTicket;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TicketCategory>('Hardware');
  const [priority, setPriority] = useState<TicketPriority>('Medium');
  const [status, setStatus] = useState<TicketStatus>('Open');
  const [assignedPerson, setAssignedPerson] = useState('');
  const [reporter, setReporter] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setCategory(editingTicket.category);
      setPriority(editingTicket.priority);
      setStatus(editingTicket.status);
      setAssignedPerson(editingTicket.assignedPerson);
      setReporter(editingTicket.reporter);
      setDepartment(editingTicket.department);
      setError('');
    } else {
      setTitle(''); setDescription(''); setCategory('Hardware');
      setPriority('Medium'); setStatus('Open');
      setAssignedPerson('Siti Rahma (IT Support)');
      setReporter(''); setDepartment('General Operations');
      setError('');
    }
  }, [editingTicket, isAddModalOpen]);

  if (!isOpen) return null;

  const handleClose = () => { setIsAddModalOpen(false); setEditingTicket(null); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Please provide a ticket title.'); return; }
    if (!description.trim()) { setError('Please describe the issue.'); return; }
    if (!reporter.trim()) { setError('Please enter reporter name.'); return; }

    if (isEditing && editingTicket) {
      updateTicket(editingTicket.id, { title: title.trim(), description: description.trim(), category, priority, status, assignedPerson: assignedPerson.trim(), reporter: reporter.trim(), department: department.trim() });
    } else {
      addTicket({ title: title.trim(), description: description.trim(), category, priority, status, assignedPerson: assignedPerson.trim(), reporter: reporter.trim(), department: department.trim() });
    }
    handleClose();
  };

  const inputCls = 'w-full bg-input text-on-base px-3.5 py-2.5 rounded-lg border border-edge focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted text-xs';
  const labelCls = 'block text-on-surface font-semibold mb-1 text-xs';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-edge rounded-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]" style={{ boxShadow: 'var(--shadow-lg)' }}>

        {/* Header */}
        <div className="px-6 py-4 border-b border-edge flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
              {isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-base">
                {isEditing ? `Edit ${editingTicket?.ticketNumber}` : 'New Ticket'}
              </h2>
              <p className="text-[11px] text-muted">Fill in the ticket details</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1.5 text-muted hover:text-on-base hover:bg-surface-alt rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/8 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
            </div>
          )}

          <div>
            <label className={labelCls}>Title <span className="text-rose-500">*</span></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Printer Offline, VPN Error..." className={inputCls} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as TicketCategory)} className={inputCls + ' cursor-pointer'}>
                <option value="Hardware">Hardware</option>
                <option value="Network">Network</option>
                <option value="Software">Software</option>
                <option value="Access & Security">Access & Security</option>
                <option value="System Error">System Error</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)} className={inputCls + ' cursor-pointer'}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as TicketStatus)} className={inputCls + ' cursor-pointer'}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Description <span className="text-rose-500">*</span></label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened, error messages, steps to reproduce..."
              className={inputCls} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Reported By <span className="text-rose-500">*</span></label>
              <input type="text" value={reporter} onChange={(e) => setReporter(e.target.value)} placeholder="Employee Name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Department</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Finance, HR..." className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Assigned IT Staff</label>
            <input type="text" value={assignedPerson} onChange={(e) => setAssignedPerson(e.target.value)} placeholder="e.g. Ahmad Fauzi or leave empty" className={inputCls} />
          </div>

          <div className="pt-4 border-t border-edge flex items-center justify-end gap-3">
            <button type="button" onClick={handleClose}
              className="px-4 py-2.5 text-xs text-on-surface hover:bg-surface-alt border border-edge rounded-lg transition-colors">Cancel</button>
            <button type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-accent hover:bg-accent-hover rounded-lg shadow-sm transition-all">
              {isEditing ? 'Save Changes' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
