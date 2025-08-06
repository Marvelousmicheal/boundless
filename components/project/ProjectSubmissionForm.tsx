'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { formatBytes } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Trash, X } from 'lucide-react';
import { toast } from 'sonner';

// Dummy data for the Select components
const fundingGoals = [
  { value: 'seed', label: 'Seed Round' },
  { value: 'series-a', label: 'Series A' },
  { value: 'public-sale', label: 'Public Sale' },
  { value: 'community-pool', label: 'Community Pool' },
];

const projectTags = [
  { value: 'defi', label: 'DeFi' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'nft', label: 'NFT' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'public-good', label: 'Public Good' },
];

interface ProjectSubmissionFormProps {
  onSuccess: () => void;
  setSubmissionStatus: (status: 'idle' | 'submitting' | 'success') => void;
}

function ProjectSubmissionForm({
  onSuccess,
  setSubmissionStatus,
}: ProjectSubmissionFormProps) {
  // State for all form fields
  const [projectTitle, setProjectTitle] = useState('');
  const [projectTagline, setProjectTagline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const [whitepaperFile, setWhitepaperFile] = useState<FileList | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<FileList | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // Refs for file inputs
  const whitepaperInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Check form validity
  useEffect(() => {
    const allFieldsFilled =
      projectTitle.trim() !== '' &&
      projectTagline.trim() !== '' &&
      projectDescription.trim() !== '' &&
      fundingGoal.trim() !== '' &&
      fundAmount.trim() !== '' &&
      whitepaperFile !== null &&
      whitepaperFile.length > 0 &&
      thumbnailFile !== null &&
      thumbnailFile.length > 0;
    setIsFormValid(allFieldsFilled);
  }, [
    projectTitle,
    projectTagline,
    projectDescription,
    fundingGoal,
    fundAmount,
    whitepaperFile,
    thumbnailFile,
  ]);

  // Tag handlers
  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // File removal handler
  const handleRemoveFile = (fileType: 'whitepaper' | 'thumbnail') => {
    if (fileType === 'whitepaper') {
      setWhitepaperFile(null);
      if (whitepaperInputRef.current) {
        whitepaperInputRef.current.value = '';
      }
    } else if (fileType === 'thumbnail') {
      setThumbnailFile(null);
      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = '';
      }
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setSubmissionStatus('submitting');
    toast.loading('Submitting your project...');

    const formData = new FormData();
    formData.append('name', projectTitle);
    formData.append('tagline', projectTagline);
    formData.append('description', projectDescription);
    formData.append('funding_goal', fundingGoal);
    formData.append('fund_amount', fundAmount);
    formData.append('tags', JSON.stringify(tags));
    if (whitepaperFile) {
      formData.append('whitepaper', whitepaperFile[0]);
    }
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile[0]);
    }

    try {
      const response = await fetch(
        'https://www.api.boundlessfi.xyz/api/projects',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Project submission failed');
      }

      toast.dismiss();
      toast.success('Project submitted successfully!');
      onSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast.dismiss();
      toast.error('Failed to submit project. Please try again.');
      setSubmissionStatus('idle');
    }
  };

  return (
    <div className='text-white'>
      <h5>Submit your project information</h5>
      <form
        onSubmit={handleSubmit}
        className='w-[500px] flex flex-col gap-3 pt-3 pb-6'
      >
        {/* Project Title */}
        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium'>
            Project Title <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-12 flex items-center gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <Image src='/cube.svg' width={20} height={20} alt='icon' />
            <input
              value={projectTitle}
              onChange={e => setProjectTitle(e.target.value)}
              type='text'
              className='w-full bg-transparent font-normal text-base text-placeholder focus:outline-none'
              placeholder='Enter project title'
            />
          </div>
        </div>

        {/* Project Tagline */}
        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium'>
            Project Tagline <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-12 flex items-center gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <input
              value={projectTagline}
              onChange={e => setProjectTagline(e.target.value)}
              type='text'
              className='w-full bg-transparent font-normal text-base text-placeholder focus:outline-none'
              placeholder='Enter your one-liner'
            />
          </div>
        </div>

        {/* Project Description */}
        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium flex justify-between'>
            <span>
              Project Description <span className='text-red-500'>*</span>
            </span>
            <span className='text-card/60'>
              {projectDescription.length}/400
            </span>
          </label>
          <Textarea
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
            maxLength={400}
            className='resize-none font-normal text-base text-placeholder rounded-[12px] bg-stepper-foreground w-full min-h-[120px] border border-stepper-border focus-visible:ring-0'
            placeholder='Describe your project in a few words'
          />
        </div>

        {/* Funding Goal */}
        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium'>
            Funding Goal <span className='text-red-500'>*</span>
          </label>
          <Select onValueChange={setFundingGoal} value={fundingGoal}>
            <SelectTrigger className='w-full !h-12 flex items-center !gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border focus:ring-0'>
              <div className='flex items-center gap-2'>
                <Image src='/select.svg' width={20} height={20} alt='icon' />
                <SelectValue placeholder='Select a funding goal' />
              </div>
            </SelectTrigger>
            <SelectContent>
              {fundingGoals.map(goal => (
                <SelectItem key={goal.value} value={goal.value}>
                  {goal.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fund Amount */}
        <div className='flex flex-col gap-1'>
          <label className='text-xs text-card font-medium'>
            Fund Amount <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-12 flex items-center gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <Image src='/dollar-sign.svg' width={20} height={20} alt='icon' />
            <input
              value={fundAmount}
              onChange={e => setFundAmount(e.target.value)}
              type='number'
              className='w-full bg-transparent font-normal text-base text-placeholder focus:outline-none'
              placeholder='Enter the amount'
            />
          </div>
        </div>

        {/* Upload Whitepaper */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='' className='text-xs text-card font-medium'>
            Upload Whitepaper or Detailed Proposal{' '}
            <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-[83px] flex justify-between p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <div className='flex gap-3 items-center'>
              <div className='bg-card size-12 rounded-full justify-center items-center flex'>
                {whitepaperFile && whitepaperFile.length > 0 ? (
                  <Image
                    src='/green-circle.svg'
                    width={24}
                    height={24}
                    alt='upload'
                  />
                ) : (
                  <Image
                    src='/upload.svg'
                    width={24}
                    height={24}
                    alt='upload'
                  />
                )}
              </div>
              <div className='space-y-1'>
                {whitepaperFile && whitepaperFile.length > 0 ? (
                  <>
                    <h5 className='font-semibold text-card text-base'>
                      {whitepaperFile[0].name}
                    </h5>
                    <p className='font-normal text-sm text-[#40B869] flex gap-0.5 items-center'>
                      Upload complete
                      <div className='size-1 bg-placeholder rounded-full' />
                      <span className='text-placeholder'>
                        {formatBytes(whitepaperFile[0].size)}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className='font-semibold text-card text-base'>
                      Upload your document
                    </h5>
                    <p className='font-normal text-sm text-placeholder flex gap-0.5 items-center'>
                      PDF, Docs{' '}
                      <span className='size-1 bg-placeholder rounded-full'></span>
                      Max. 20MB
                    </p>
                  </>
                )}
              </div>
            </div>
            <input
              type='file'
              className='hidden'
              ref={whitepaperInputRef}
              onChange={e => setWhitepaperFile(e.target.files)}
              accept='.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            />
            {whitepaperFile && whitepaperFile.length > 0 ? (
              <button
                type='button'
                className='text-base font-normal text-background bg-transparent px-4 py-2 rounded-[10px]'
                onClick={() => handleRemoveFile('whitepaper')}
              >
                <Trash className='text-red-500' />
              </button>
            ) : (
              <button
                type='button'
                className='text-base font-normal text-background bg-primary px-4 py-2 rounded-[10px]'
                onClick={() => whitepaperInputRef.current?.click()}
              >
                Upload
              </button>
            )}
          </div>
        </div>

        {/* Upload Project Thumbnail */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='' className='text-xs text-card font-medium'>
            Upload Project Thumbnail <span className='text-red-500'>*</span>
          </label>
          <div className='w-full h-[83px] flex justify-between p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <div className='flex gap-3 items-center'>
              <div className='bg-card size-12 rounded-full justify-center items-center flex'>
                {thumbnailFile && thumbnailFile.length > 0 ? (
                  <Image
                    src='/green-circle.svg'
                    width={24}
                    height={24}
                    alt='upload'
                  />
                ) : (
                  <Image
                    src='/upload.svg'
                    width={24}
                    height={24}
                    alt='upload'
                  />
                )}
              </div>
              <div className='space-y-1'>
                {thumbnailFile && thumbnailFile.length > 0 ? (
                  <>
                    <h5 className='font-semibold text-card text-base'>
                      {thumbnailFile[0].name}
                    </h5>
                    <p className='font-normal text-sm text-[#40B869] flex gap-0.5 items-center'>
                      Upload complete
                      <div className='size-1 bg-placeholder rounded-full' />
                      <span className='text-placeholder'>
                        {formatBytes(thumbnailFile[0].size)}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className='font-semibold text-card text-base'>
                      Upload your image
                    </h5>
                    <p className='font-normal text-sm text-placeholder flex gap-0.5 items-center'>
                      JPG, PNG, GIF{' '}
                      <span className='size-1 bg-placeholder rounded-full'></span>
                      Max. 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
            <input
              type='file'
              className='hidden'
              ref={thumbnailInputRef}
              onChange={e => setThumbnailFile(e.target.files)}
              accept='image/png, image/jpeg, image/gif'
            />
            {thumbnailFile && thumbnailFile.length > 0 ? (
              <button
                type='button'
                className='text-base font-normal text-background bg-transparent px-4 py-2 rounded-[10px]'
                onClick={() => handleRemoveFile('thumbnail')}
              >
                <Trash className='text-red-500' />
              </button>
            ) : (
              <button
                type='button'
                className='text-base font-normal text-background bg-primary px-4 py-2 rounded-[10px]'
                onClick={() => thumbnailInputRef.current?.click()}
              >
                Upload
              </button>
            )}
          </div>
        </div>

        {/* Add Tags */}
        <div className='flex flex-col gap-2'>
          <label className='text-xs text-card font-medium flex items-center justify-between'>
            Add Tags <span className='text-placeholder'>Optional</span>
          </label>
          <div className='relative'>
            <Select onValueChange={handleAddTag}>
              <SelectTrigger className='w-full !h-12 flex items-center !gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border focus:ring-0'>
                <div className='flex items-center gap-2'>
                  <Image src='/tag.svg' width={20} height={20} alt='icon' />
                  <SelectValue placeholder='Select a tag' />
                </div>
              </SelectTrigger>
              <SelectContent>
                {projectTags.map(tag => (
                  <SelectItem
                    key={tag.value}
                    value={tag.value}
                    disabled={tags.includes(tag.value)}
                  >
                    {tag.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {tags.length > 0 && (
              <div className='absolute top-1/2 left-12 -translate-y-1/2 flex flex-wrap gap-2 items-center pointer-events-none'>
                {tags.map(tag => (
                  <Badge
                    key={tag}
                    className='flex items-center gap-1 pointer-events-auto bg-background text-card'
                  >
                    {projectTags.find(t => t.value === tag)?.label || tag}
                    <button
                      type='button'
                      className='ml-1 rounded-full outline-none hover:bg-destructive/20'
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className='size-3' />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type='submit'
          disabled={!isFormValid}
          className={`w-[171px] mt-4 text-base font-medium px-4 py-2 rounded-[10px] transition-colors ${
            isFormValid
              ? 'bg-primary text-background border border-primary'
              : 'bg-stepper-foreground text-card/30 border border-stepper-border cursor-not-allowed'
          }`}
        >
          Submit for Review
        </button>
      </form>
    </div>
  );
}

export default ProjectSubmissionForm;
