CREATE VIEW Hardware_Item_View AS
	SELECT h.id, h.name, h.description, r.checked_out < now() AND r.return > now() AND r.status = 'Confirmed' AS is_checked_out
	FROM HardwareResource h
	JOIN ResourceRequest r
		ON h.id = r.item_id;
		
CREATE VIEW Hardware_Processing_View AS
	SELECT h.serial_num, h.name, h.description, h.color, h.picture, r.id, r.user_id, r.item_id, r.checked_out, r.return
	FROM HardwareResource h
	JOIN ResourceRequest r
		ON h.id = r.item_id
	WHERE r.status = 'Processing';

CREATE VIEW Hardware_Request_Info_View AS
	SELECT r.id, h.name AS item_name, h.serial_num AS item_serial_num, w.first_name || ' ' || w.last_name AS requestor_name, r.checked_out, r.return
	FROM HardwareResource h
	JOIN ResourceRequest r
		ON h.id = r.item_id
	JOIN WebUser w
		ON w.id = r.user_id;
		
CREATE VIEW Officers_View AS
	SELECT w.first_name, w.last_name, t.name
	FROM WebUser w
	JOIN Title t
		ON w.title = t.id;