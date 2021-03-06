import {Component, enableProdMode, OnInit, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Router} from "@angular/router";
import {Session} from "./session";
import {SessionService} from "./session.service";
import {Speaker} from "../speaker/speaker";

enableProdMode();

@Component({
    selector: 'sessions',
    templateUrl: 'app/session/sessions.component.html'
})
export class SessionsComponent implements OnInit, OnChanges  {
    title = 'Sessions';
    sessions: Session[];
    selectedSession: Session;
    search: string;
    @Input() speaker: Speaker;

    constructor(private router: Router, private sessionService: SessionService) {
    }

    getSessions(): void {
        this.sessionService.getSessions().then(sessions => this.sessions = sessions).catch(SessionsComponent.handleError);
    }

    ngOnInit(): void {
        let _self = this;
        this.sessionService.init(function () {
            _self.getSessions();
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['speaker'].currentValue != changes['speaker'].previousValue){
            console.log("Reset selected session");
            this.selectedSession = null;
        }
    }

    onSelect(session: Session): void {
        this.selectedSession = session;
    }

    onSearch(search: string): void {
        this.search = search;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedSession.id]);
    }

    //noinspection TypeScriptUnresolvedVariable
    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // TODO - Display safe error
        //noinspection TypeScriptUnresolvedVariable
        return Promise.reject(error.message || error);
    }
}