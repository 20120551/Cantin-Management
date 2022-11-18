const WaitingState = require('./waiting-state');
const PendingState = require('./pending-state');
const SuccessState = require('./success-state');
const FailureState = require('./failure-state');

class PaymentThirdParty {
    constructor() {
        this.waitingState = new WaitingState(this);
        this.pendingState = new PendingState(this);
        this.successState = new SuccessState(this);
        this.failureState = new FailureState(this);

        this.currentState = this.waitingState;
    }

    execPayment = async (payload) => {
        try {
            const response = await this.currentState.execPayment(payload);
            console.log('current state: ', this.currentState.toString());
            return response;
        } catch (err) {
            throw err;
        }
    }

    setState = (state) => {
        this.currentState = state;
    }

    clone = () => {
        return new PaymentThirdParty();
    }
}

module.exports = PaymentThirdParty;