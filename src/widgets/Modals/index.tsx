'use client'

import { Suspense, useEffect } from 'react'

import Modal from '@/components/Overlay/Modal'

import { useModalStore } from '@/store/modal'

export const Modals = () => {
  const modals = useModalStore((state) => state.modals)
  const closeModal = useModalStore((state) => state.closeModal)

  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [modals.length])

  useEffect(() => {
    if (!modals.length) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [modals.length, closeModal])

  if (!modals.length) return null

  return (
    <>
      {
        modals.map((modal) => {
          const ModalBody = modal.Component
          return (
            <Suspense key={modal.id} fallback={null}>
              <Modal
                zIndex={modal.zIndex}
                title={modal.title}
                size={modal.size || 'sm'}
                onClose={() => closeModal(modal.id)}
              >
                <ModalBody {...modal.props} />
              </Modal>
            </Suspense>
          )
        })
      }
    </>
  )
}

export default Modals
