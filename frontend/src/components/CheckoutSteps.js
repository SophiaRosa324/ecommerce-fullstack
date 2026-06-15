import React from 'react'

const CheckoutSteps = ({ step1, step2, step3 }) => {
  const stepClass = (active) => (active ? 'checkout-step active' : 'checkout-step')

  return (
    <div className="checkout-steps">
      <div className={stepClass(step1)}>
        <span>1</span>
        <div>
          <small>Entrega</small>
        </div>
      </div>
      <div className={stepClass(step2)}>
        <span>2</span>
        <div>
          <small>Pagamento</small>
        </div>
      </div>
      <div className={stepClass(step3)}>
        <span>3</span>
        <div>
          <small>Confirmar</small>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSteps
