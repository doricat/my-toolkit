import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TreeNode } from '../../shared/tree-viewer/treeNode';
import { Store } from '@ngrx/store';
import { PdmState } from 'src/app/reducers/pdm.reducer';
import { readTables, selectTable } from 'src/app/actions/pdm.actions';

@Component({
    selector: 'app-pdm-object-viewer',
    templateUrl: './pdm-object-viewer.component.html',
    styleUrls: ['./pdm-object-viewer.component.scss']
})
export class PdmObjectViewerComponent implements OnInit, OnDestroy {
    nodes: TreeNode[];
    pdmState$: Observable<PdmState>;
    subscription?: Subscription;

    constructor(private store: Store<{ pdm: PdmState }>) {
        this.pdmState$ = store.select('pdm');
    }

    ngOnInit(): void {
        this.subscription = this.pdmState$.subscribe(x => {
            if (x.rootObject) {
                if (x.tables === undefined) {
                    this.store.dispatch(readTables());
                }
            }

            if (x.treeNodes) {
                this.nodes = x.treeNodes;
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    navigate(objId: string): void {
        this.store.dispatch(selectTable({ objectId: objId }));
    }
}
