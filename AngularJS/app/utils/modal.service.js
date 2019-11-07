
(function () {
    'use strict';

    angular
        .module('app')
        .service('app.ModalService', modalService);

    function modalService($document) {

        this.showModal = function(ariaLabelledBy){
            var modal = $document[0].querySelectorAll('[aria-labelledby="' + ariaLabelledBy + '"][uib-modal-window="modal-window"]')[0];
            if(modal){
                modal.style.display = "block";
            }
            getOpenedModals().length > 0 ? $document[0].body.classList.add('modal-open') : $document[0].body.classList.remove('modal-open');
        }

        this.hideModal = function (ariaLabelledBy) {
            var modal = $document[0].querySelectorAll('[aria-labelledby="' + ariaLabelledBy + '"][uib-modal-window="modal-window"]')[0];
            if (modal) {
                modal.style.display = "none";
            }
            getOpenedModals().length == 0 ? $document[0].body.classList.remove('modal-open') : $document[0].body.classList.add('modal-open');
        }

        this.removelAllModals = function (){
            var openedModals = getOpenedModals();
            _.forEach(openedModals, function(modal){
                angular.element(modal).remove();
            });
            $document[0].body.classList.remove('modal-open');
        }

        var getOpenedModals = function(){
            var modals = $document[0].querySelectorAll('[aria-labelledby][uib-modal-window="modal-window"]');
            return _.filter(modals, function(modal){
                return modal.style.display == 'block';
            });
        }

        var getHiddenModals = function(){
            var modals = $document[0].querySelectorAll('[aria-labelledby][uib-modal-window="modal-window"]');
            return _.filter(modals, function(modal){
                return modal.style.display == 'none';
            });
        }


    }

    modalService.$inject = ["$document"];
})();