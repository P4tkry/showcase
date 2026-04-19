'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type GalleryImage = {
  alt: string
  id?: number | string | null
  url: string
}

type ProjectGalleryProps = {
  images: GalleryImage[]
  mainImage: GalleryImage
}

export default function ProjectGallery({ images, mainImage }: ProjectGalleryProps) {
  const allImages = [mainImage, ...images]
  const previewImages = images.slice(0, 3)
  const mobileHiddenImagesCount = Math.max(allImages.length - 3, 0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showPreviousImage = () => {
    setActiveIndex((current) => (current - 1 + allImages.length) % allImages.length)
  }
  const showNextImage = () => {
    setActiveIndex((current) => (current + 1) % allImages.length)
  }

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
        return
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        showNextImage()
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        showPreviousImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [allImages.length, isModalOpen])

  const activeImage = allImages[activeIndex] ?? mainImage

  return (
    <>
      <section className={`rounded-[24px] border border-white/6 bg-[#1d2228] p-3 md:p-4 ${images.length ? 'grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-stretch' : 'block'}`}>
        <button
          type={'button'}
          onClick={() => {
            setActiveIndex(0)
            setIsModalOpen(true)
          }}
          className={'relative block w-full aspect-[16/9] cursor-pointer overflow-hidden rounded-[18px] border border-white/6 bg-[#161b20] text-left xl:h-full xl:min-h-[32rem] xl:aspect-auto'}
        >
          <Image
            src={mainImage.url}
            alt={mainImage.alt}
            fill
            className={'object-cover transition duration-300 hover:scale-[1.01]'}
            sizes={images.length ? '(max-width: 1280px) 100vw, 940px' : '(max-width: 1260px) 100vw, 1260px'}
          />
        </button>

        {images.length ? (
          <div className={'grid grid-cols-3 gap-3 overflow-hidden xl:h-full xl:grid-cols-1 xl:grid-rows-2 xl:gap-4'}>
            {previewImages.map((image, index) => {
              const isLastVisibleTile = index === previewImages.length - 1
              const shouldShowMoreOverlay = isLastVisibleTile && mobileHiddenImagesCount > 0

              return (
                <button
                  key={`${image.id ?? image.url}-${index}`}
                  type={'button'}
                  onClick={() => {
                    setActiveIndex(index + 1)
                    setIsModalOpen(true)
                  }}
                  className={'group relative aspect-square cursor-pointer overflow-hidden rounded-[18px] border border-white/6 text-left xl:h-full xl:aspect-auto'}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className={`object-cover transition duration-300 hover:scale-[1.03] ${
                      shouldShowMoreOverlay ? 'opacity-55' : ''
                    }`}
                    sizes={'(max-width: 1280px) 100vw, 320px'}
                  />
                  {shouldShowMoreOverlay ? (
                    <div className={'absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-[#0f1318]/58'}>
                      <span className={'cursor-pointer font-jetbrains-mono text-sm uppercase tracking-[0.2em] text-[#eef2f5] underline-offset-4 transition group-hover:underline'}>
                        +{mobileHiddenImagesCount} wiecej
                      </span>
                    </div>
                  ) : null}
                </button>
              )
            })}
          </div>
        ) : null}
      </section>

      {isModalOpen ? (
        <div className={'fixed inset-0 z-50 flex items-center justify-center bg-black/72 p-4 backdrop-blur-sm'} onClick={() => setIsModalOpen(false)}>
          <div
            className={
              'flex h-[min(88vh,920px)] w-full max-w-6xl flex-col gap-4 overflow-hidden rounded-[24px] border border-white/8 bg-[#1d2228] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-6'
            }
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <div className={'flex items-center justify-end'}>
              <button
                type={'button'}
                onClick={() => setIsModalOpen(false)}
                className={'cursor-pointer font-jetbrains-mono text-sm uppercase tracking-[0.18em] text-[#a8b3bf] transition hover:text-white'}
                aria-label={'Close modal'}
              >
                X Close
              </button>
            </div>

            <div className={'flex min-h-0 flex-1 items-stretch gap-4'}>
              {allImages.length > 1 ? (
                <>
                  <button
                    type={'button'}
                    onClick={showPreviousImage}
                    className={
                      'flex h-12 w-12 shrink-0 self-center cursor-pointer items-center justify-center rounded-full border border-white/8 bg-[#23282f] text-white transition hover:bg-[#2a3038]'
                    }
                    aria-label={'Previous image'}
                  >
                    <FaChevronLeft size={16} />
                  </button>
                </>
              ) : null}

              <div className={'relative h-full min-h-0 flex-1 overflow-hidden'}>
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt}
                  fill
                  className={'object-contain'}
                  sizes={'(max-width: 1280px) 100vw, 1200px'}
                  priority
                />
              </div>

              {allImages.length > 1 ? (
                <button
                  type={'button'}
                  onClick={showNextImage}
                  className={
                    'flex h-12 w-12 shrink-0 self-center cursor-pointer items-center justify-center rounded-full border border-white/8 bg-[#23282f] text-white transition hover:bg-[#2a3038]'
                  }
                  aria-label={'Next image'}
                >
                  <FaChevronRight size={16} />
                </button>
              ) : null}
            </div>

            <div className={'flex gap-3 overflow-x-auto overflow-y-hidden pt-2'}>
              {allImages.map((image, index) => (
                <button
                  key={`${image.id ?? image.url}-modal-${index}`}
                  type={'button'}
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/8 transition md:h-28 md:w-28 ${
                    index === activeIndex ? 'scale-[1.02] opacity-100' : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className={'object-cover'}
                    sizes={'160px'}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
